import { getWeather } from "../../services/weatherapi";

const state = {
    weatherCache: null,
    weatherCacheForecast: null,
}

const getters = {
    weatherCache: state => state.weatherCache,
}

const mutations = {
    SET_WEATHER_CACHE: (state, payload) => {
        state.weatherCache = payload
    },
}

const actions = {
    async searchLocation({ commit }, payload) {
        const weather = await getWeather(payload)
        commit('SET_WEATHER_CACHE', weather.data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}