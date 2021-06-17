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
    activeTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed)
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
    async getTodos({ state, commit, dispatch }) {
        await dispatch('setTodoSources')
        if (!state.todoSources) {
            return console.log("No Todo sources")
        }
        let source = state.todoSources.find((element) => element.id === state.activeTodoSource.id)

        await axios.get(source.url).then((response) => {
            let todo = response.data
            return commit('ADD_TODO_ARRAY', todo)
        })
    },
    getTodoIndexById() {

    },
    async addTodo({ commit }, payload) {
        let newTodo = {
            summary: payload,
            completed: false,
            id: new Date().getTime() + "@home.mem-home",
        }
        return commit('ADD_TODO', newTodo)
        // CALL API
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