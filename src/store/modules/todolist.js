import axios from 'axios'

const state = {
    todos: [],
    todoSources: [],
    todoSourceColors: {},
    activeTodoSource: {
        id: 'indkbsliste',
    },
    syncList: [],
}

const getters = {
    todos: state => state.todos,
    todoSources: state => state.todoSources,
    activeTodoSource: (state, getters) => {
        const id = state.activeTodoSource.id
        const source = getters.getSingleSourceURL(id)
        return {
            id: id,
            url: source
        }
    },
    activeTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed),
    syncList: state => state.syncList,
}

const mutations = {
    ADD_TODO_SOURCES(state, payload) {
        state.todoSources = payload
    },
    ADD_TODO_ARRAY(state, payload) {
        state.todos = payload
    },
    ADD_TODO(state, payload) {
        state.todos.push(payload)
    },
    DELETE_TODO(state, payload) { // TODO
        const filteredTodos = state.todos.filter(todo => todo.id !== payload.id)
        state.todos = filteredTodos
    },
    UPDATE_TODO(state, payload) {
        const todo = state.todos.find(todo => todo.id === payload.id)
        Object.assign(todo, payload)
    },
    ADD_TO_SYNC_LIST(state, payload) {
        state.syncList.push(payload)
    },
    DELETE_FROM_SYNC_LIST(state, payload) {
        const filteredSyncList = state.syncList.filter(item => item !== payload)
        state.syncList = filteredSyncList
    }
}

const actions = {
    async setTodoSources({ commit, getters }) {
        const todoSourceColors = JSON.parse(localStorage.getItem('todoSourceColors')) || null
        const calendarsSource = getters.getSourcesURL
        try {
            const response = await axios.get(calendarsSource)
            let todoSources = []
            response.data.forEach((data) => {
                var newData = data
                if (!data.hasTodos) return //skip event source it it has 0 todos

                if (todoSourceColors) { // use localStorage colors if they are available
                    newData.color = todoSourceColors[data.id]
                }
                const url = `${getters.getSingleSourceURL(newData.id)}/todos`
                todoSources.push({
                    id: newData.id,
                    url: url,
                    color: newData.color,
                    name: newData.displayName
                })
            })
            return commit('ADD_TODO_SOURCES', todoSources)
        } catch (error) {
            console.log(error)
        }
    },
    async getTodos({ state, commit, dispatch, getters }) {
        await dispatch('setTodoSources')
        if (!state.todoSources) {
            return console.log("No Todo sources")
        }

        const sourceURL = `${getters.activeTodoSource.url}/todos`
        await axios.get(sourceURL).then((response) => {
            let todo = response.data
            return commit('ADD_TODO_ARRAY', todo)
        })
    },
    async addTodo({ commit, getters, dispatch }, payload) {
        let newTodo = {
            summary: payload,
            completed: false,
            categories: payload.categories || '',
            id: new Date().getTime() + "@home.mem-home",
        }
        commit('ADD_TODO', newTodo)

        const sourceURL = `${getters.activeTodoSource.url}/todos`
        // CALL API
        commit('ADD_TO_SYNC_LIST', newTodo.id)
        const response = await axios.post(sourceURL, newTodo)
        newTodo.rawData = response.data
        commit('UPDATE_TODO', newTodo)
        const sync = await dispatch('syncCalendars')
        commit('DELETE_FROM_SYNC_LIST', newTodo.id)
        console.log("sync completed:", sync)
    },
    async updateTodo({ commit, getters, dispatch }, payload) {
        commit('UPDATE_TODO', payload)
        // CALL API
        const sourceURL = `${getters.activeTodoSource.url}/todo/${payload.id}`

        commit('ADD_TO_SYNC_LIST', payload.id)
        const response = await axios.put(sourceURL, payload)
        console.log("update completed:", response)

        const sync = await dispatch('syncCalendars')
        commit('DELETE_FROM_SYNC_LIST', payload.id)
        console.log("sync completed:", sync)
    },
    async deleteTodo({ commit, getters, dispatch }, payload) {
        commit('DELETE_TODO', payload)
        // CALL API
        const sourceURL = `${getters.activeTodoSource.url}/todo/${payload.id}`
        await axios.delete(sourceURL).then(response => {
            console.log(response)
        })
        const sync = await dispatch('syncCalendars')
        console.log("sync completed:", sync)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}