import axios from 'axios'

function sortTodos(todos) {
    todos.sort((a, b) => {
        return b.sortByTime - a.sortByTime
    })
    return todos
}

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
        state.todos.unshift(payload)
    },
    DELETE_TODO(state, payload) {
        const filteredTodos = state.todos.filter(todo => todo.id !== payload.id)
        state.todos = filteredTodos
    },
    UPDATE_TODO(state, payload) {
        const filteredTodos = state.todos.filter(todo => todo.id !== payload.id)
        state.todos = filteredTodos
        state.todos.unshift(payload)
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
            let todos = response.data
            console.log("Todos fetched")
            todos = sortTodos(todos)
            return commit('ADD_TODO_ARRAY', todos)
        })
    },
    async addTodo({ commit, getters, dispatch }, payload) {
        let newTodo = {
            summary: payload.summary,
            completed: false,
            categories: payload.categories || '',
            id: new Date().getTime() + "@home.mem-home",
        }
        commit('ADD_TODO', newTodo)

        const sourceURL = `${getters.activeTodoSource.url}/todos`
        // CALL API
        const syncId = new Date().getTime()
        commit('ADD_TO_SYNC_LIST', syncId)
        const response = await axios.post(sourceURL, newTodo)
        newTodo.rawData = response.data
        commit('UPDATE_TODO', newTodo)
        commit('DELETE_FROM_SYNC_LIST', syncId)
        if (state.syncList.length < 1) {
            await dispatch('syncCalendars')
        }
    },
    async updateTodo({ state, commit, getters, dispatch }, payload) {
        commit('UPDATE_TODO', payload)
        // CALL API
        const sourceURL = `${getters.activeTodoSource.url}/todo/${payload.id}`
        const syncId = new Date().getTime()
        commit('ADD_TO_SYNC_LIST', syncId)
        const response = await axios.put(sourceURL, payload)
        commit('DELETE_FROM_SYNC_LIST', syncId)
        console.log("update completed:", response)

        //don't sync (and fetch) calendars until all updates are complete. Wait 5 sec before checking
        if (state.syncList.length < 1) {
            await dispatch('syncCalendars')
        }
    },
    async deleteTodo({ commit, getters, dispatch }, payload) {
        payload.changed = true
        commit('DELETE_TODO', payload)
        // CALL API
        const sourceURL = `${getters.activeTodoSource.url}/todo/${payload.id}`

        const syncId = new Date().getTime()
        commit('ADD_TO_SYNC_LIST', syncId)
        const response = await axios.delete(sourceURL)

        commit('DELETE_FROM_SYNC_LIST', syncId)
        console.log("delete completed: ", response)

        //don't sync (and fetch) calendars until all updates are complete. Wait 5 sec before checking
        if (state.syncList.length < 1) {
            await dispatch('syncCalendars')
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}