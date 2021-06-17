import axios from 'axios'

const caldavAPI = "http://localhost:3000"
const calendars = caldavAPI+'/calendars'

const createTodoSourceURL = slug => `${caldavAPI}/calendar/${slug}/todos`

const state = {
    todos: [],
    todoSources: [],
    todoSourceColors: {},
    activeTodoSource: {
        id: 'indkbsliste',
    },
}

const getters = {
    todos: state => state.todos,
    todoSources: state => state.todoSources,
    activeTodoSource: state => {
        const id = state.activeTodoSource.id
        const source = createTodoSourceURL(id)
        return {
            id: id,
            url: source
        }
    },
    activeTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed),
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
    }
}

const actions = {
    async setTodoSources({ commit }) {
        const todoSourceColors = JSON.parse(localStorage.getItem('todoSourceColors')) || null
        try {
            await axios.get(calendars).then((response) => {
                let todoSources = []
                response.data.forEach((data) => {
                    var newData = data
                    if (!data.hasTodos) return //skip event source it it has 0 todos

                    if (todoSourceColors) { // use localStorage colors if they are available
                        newData.color = todoSourceColors[data.id]
                    }
                    todoSources.push({
                        id: newData.id,
                        url: createTodoSourceURL(newData.id),
                        color: newData.color,
                        name: newData.displayName
                    })
                })
                return commit('ADD_TODO_SOURCES', todoSources)
            })
        } catch (error) {
            console.log(error);
        }
    },
    async getTodos({ state, commit, dispatch, getters }) {
        await dispatch('setTodoSources')
        if (!state.todoSources) {
            return console.log("No Todo sources")
        }
        const source = getters.activeTodoSource.url

        await axios.get(source).then((response) => {
            let todo = response.data
            return commit('ADD_TODO_ARRAY', todo)
        })
    },
    async addTodo({ commit, getters }, payload) {
        let newTodo = {
            summary: payload,
            completed: false,
            id: new Date().getTime() + "@home.mem-home",
        }
        commit('ADD_TODO', newTodo)

        const sourceURL = getters.activeTodoSource.url
        // CALL API
        await axios.post(sourceURL, newTodo)
        .then((response) => {
            console.log(response)
        })
    },
    async toggleCompleteTodo({ commit }, payload) {
        payload.completed = !payload.completed
        commit('UPDATE_TODO', payload)
        // CALL API
    },
    async updateTodo({ commit }, payload) {
        payload.todo.summary = payload.newSummary
        commit('UPDATE_TODO', payload.todo)
        // CALL API
    },
    async deleteTodo({ commit }, payload) {
        commit('DELETE_TODO', payload)
        // CALL API
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}