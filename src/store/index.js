import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import calendar from './modules/calendar'
import todolist from './modules/todolist'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		caldavAPI: "http://localhost:3000",
	},
	getters: {
		getSingleSourceURL: (state) => (slug) => {
			return `${state.caldavAPI}/calendar/${slug}`
		},
		getSourcesURL: state => `${state.caldavAPI}/calendars`
	},
	actions: {
		async syncCalendars({ getters, dispatch }) {
			const url = `${getters.getSourcesURL}/sync`
			const response = await axios.get(url)
			await dispatch('getTodos')
			return response
		}
	},
	modules: {
		calendar,
		todolist
	}
})
