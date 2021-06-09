import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const caldavAPI = "http://localhost:3000"
const calendars = caldavAPI+'/calendars'

const createEventSourceURL = slug => `${caldavAPI}/calendar/${slug}/events`

export default new Vuex.Store({
  state: {
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
      ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5' ],
      ['#8b5aff', '#a27bff', '#b99cff', '#d0bdff', '#e8deff' ],
      ['#51e5db', '#74ebe3', '#96f0ea', '#b9f5f1', '#dcfaf8' ],
      ['#ffa51a', '#ffb748', '#ffc976', '#ffdba3', '#ffedd1' ]
    ],
  },
  getters: {
    events: state => state.events,
    eventSources: state => state.eventSources,
    eventSourceColors: state => {
      let obj = {}
      state.eventSources.forEach((eventSource) => {
        obj[eventSource.id] = eventSource.color
      })
      return obj
    },
    defaultColorSwatches: state => state.defaultColorSwatches,
    flattenedColorSwatch: state => [].concat(...state.defaultColorSwatches),
  },
  mutations: {
    ADD_EVENT_SOURCE(state, payload) {
      state.eventSources.push({
        id: payload.id,
        url: createEventSourceURL(payload.id),
        color: payload.color,
        name: payload.displayName
      })
    },
    CHANGE_EVENT_SOURCE_COLOR(state, payload) {
      state.eventSources[payload.index].color = payload.color
    },
    SET_EVENT_SOURCE_COLOR(state, payload) {
      state.eventSourceColors[payload.id] = payload.color
    }
  },
  actions: {
    async setEventSources({ commit }) {
      const eventSourceColors = JSON.parse(localStorage.getItem('eventSourceColors')) || null
      try {
        await axios.get(calendars).then((response) => {
          response.data.forEach((data) => {
            var newData = data
            if (!data.hasEvents) return //skip event source it it has 0 events

            if (eventSourceColors) { // use localStorage colors if they are available
              newData.color = eventSourceColors[data.id]
            }

            return commit('ADD_EVENT_SOURCE', newData)
          })
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
  },
  modules: {
  }
})
