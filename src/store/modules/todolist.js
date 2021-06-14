import axios from 'axios'

const caldavAPI = "http://localhost:3000"
const calendars = caldavAPI+'/calendars'

const createTodoSourceURL = slug => `${caldavAPI}/calendar/${slug}/todos`

const state = {
    todos: [],
    todoSources: [],
    todoSourceColors: {},
}

const getters = {
    todos: state => state.todos,
    todoSources: state => state.todoSources
}

const mutations = {
    ADD_TODO_SOURCES(state, payload) {
        state.todoSources = payload
        console.log(payload);
    },
    ADD_TODO(state, payload) {
        state.todos.push(payload)
    },
    DELETE_TODO(state, payload) {
        state
        payload
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
        let sources = state.todoSources

        for (const source of sources) {
            await axios.get(source.url).then((response) => {
                let todo = response.data
                console.log(todo)
                return commit('ADD_TODO', todo)
            })
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}