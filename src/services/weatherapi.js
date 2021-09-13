import axios from 'axios'
import ConfigProvider from '../ConfigProvider'

const weatherApiKey = ConfigProvider.value('weatherApiKey')

async function getWeather(payload) {
    payload
    const lat = "55.490398" //payload.lat
    const lon = "9.47216" //payload.lon
    return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&lang=da&units=metric`)
}

export {
    getWeather
}
