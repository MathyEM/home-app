import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import calendar from './modules/calendar'
import todolist from './modules/todolist'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		caldavAPI: "http://localhost:3000",
		syncStatus: false,
	},
	getters: {
		getSingleSourceURL: (state) => (slug) => {
			return `${state.caldavAPI}/calendar/${slug}`
		},
		getSourcesURL: state => `${state.caldavAPI}/calendars`
	},
	mutations: {
		TOGGLE_SYNC_STATUS(state, payload) {
			state.syncStatus = payload
			console.log(`syncStatus was ${!state.syncStatus}, now ${state.syncStatus}`)
		},
	},
	actions: {
		async syncCalendars({ state, getters, commit, dispatch }) {
			if (state.syncStatus) return 'Sync already in progress... skipping'
			const url = `${getters.getSourcesURL}/sync`
			commit('TOGGLE_SYNC_STATUS', true)
			const response = await axios.get(url)
			commit('TOGGLE_SYNC_STATUS', false)
			if (todolist.state.syncList <= 1) await dispatch('getTodos')
			return response
		}
	},
	modules: {
		calendar,
		todolist
	}
})
