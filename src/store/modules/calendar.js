import axios from 'axios'

const state = {
    events: [
        {
            title: "Event 1",
            start: new Date('2021-06-07T14:00:00').toISOString().replace(/\.[0-9]{3}/, ''),
            end: new Date('2021-06-09T14:30:00').toISOString().replace(/\.[0-9]{3}/, '')
        },
        {
            title: "Event 2",
            start: '2021-06-08'
        }
    ],
    eventSources: [],
    eventSourceColors: {},
    defaultColorSwatches: [
        ['#F64272', '#F493A7', '#FFCCD5' ],
        ['#8b5aff', '#b99cff', '#e8deff' ],
        ['#51e5db', '#96f0ea', '#dcfaf8' ],
        ['#ffa51a', '#ffc976', '#ffedd1' ]
    ],
}
const getters = {
    events: state => state.events,
    eventSources: state => state.eventSources,
    eventSourceById: (state) => (id) => {
        return state.eventSources.find(eventSource => eventSource.id == id)
    },
    eventSourceColors: state => {
        let obj = {}
        state.eventSources.forEach((eventSource) => {
            obj[eventSource.id] = eventSource.color
        })
        return obj
    },
    defaultColorSwatches: state => state.defaultColorSwatches,
    flattenedColorSwatch: state => [].concat(...state.defaultColorSwatches),
}
const mutations = {
    ADD_EVENT_SOURCES(state, payload) {
        state.eventSources = payload
    },
    CHANGE_EVENT_SOURCE_COLOR(state, payload) {
        state.eventSources[payload.index].color = payload.color
    },
    SET_EVENT_SOURCE_COLOR(state, payload) {
        state.eventSourceColors[payload.id] = payload.color
    }
}
const actions = {
    async setEventSources({ commit, getters }) {
        const eventSourceColors = JSON.parse(localStorage.getItem('eventSourceColors')) || null
        const calendarsSource = getters.getSourcesURL
        try {
            await axios.get(calendarsSource).then((response) => {
                let eventSources = []
                response.data.forEach((data) => {
                    var newData = data
                    if (!data.hasEvents) return //skip event source it it has 0 events

                    if (eventSourceColors) { // use localStorage colors if they are available
                        newData.color = eventSourceColors[data.id]
                    }
                    
                    const url = `${getters.getSingleSourceURL(newData.id)}/events`
                    eventSources.push({
                        id: newData.id,
                        url: url,
                        color: newData.color,
                        name: newData.displayName
                    })
                })
                return commit('ADD_EVENT_SOURCES', eventSources)
            })
        } catch (error) {
            console.log(error);
        }
    },
    async setEventSourceColor({ commit }, payload) {
        return commit('CHANGE_EVENT_SOURCE_COLOR', payload)
    },
    setLocalStorageEventSourceColors({ getters }, payload) {
        if (localStorage.eventSourceColors) {
            let eventSourceColors = JSON.parse(localStorage.getItem('eventSourceColors'))
            eventSourceColors[payload.id] = payload.color
            localStorage.setItem('eventSourceColors', JSON.stringify(eventSourceColors))
        } else {
            localStorage.setItem('eventSourceColors', JSON.stringify(getters.eventSourceColors))
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}