import { getWeather } from "../../services/weatherapi";

const state = {
    weatherCache: {},
}

const getters = {
    weatherCache: state => state.weatherCache,
    currentWeather: state => state.weatherCache.current,
    hourlyWeather: state => state.weatherCache.hourly,
    dailyWeather: state => state.weatherCache.daily,
}

const mutations = {
    SET_WEATHER_CACHE: async (state, payload) => {
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