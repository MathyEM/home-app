import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
  },
  getters: {
    events: state => state.events,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
