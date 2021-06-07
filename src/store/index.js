import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const caldavAPI = "http://localhost:3000"
const sluglist = caldavAPI+'/calendars/sluglist'

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
        url: createEventSourceURL(payload)
      })
    },
  },
  actions: {
    async getSlugs({ commit }) {
      try {
        await axios.get(sluglist).then((response) => {
          response.data.forEach((slug) => {
            commit('ADD_EVENT_SOURCE', slug)
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
