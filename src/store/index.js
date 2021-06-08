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
    eventSources: []
  },
  getters: {
    events: state => state.events,
    eventSources: state => state.eventSources,
  },
  mutations: {
    ADD_EVENT_SOURCE(state, payload) {
      state.eventSources.push({
        id: payload.id,
        url: createEventSourceURL(payload.id),
        color: "#730080",
        name: payload.displayName
      })
    },
  },
  actions: {
    async setEventSources({ commit }) {
      try {
        await axios.get(calendars).then((response) => {
          response.data.forEach((data) => {
            if (!data.hasEvents) return
            commit('ADD_EVENT_SOURCE', data)
          })
        })
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  }
})
