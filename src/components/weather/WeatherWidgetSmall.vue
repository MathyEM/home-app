<template>
    <div v-if="currentWeather && dailyWeather" class="current-weather-small-container">
            <div class="current-weather-small-wrapper">
                <img class="weather-icon icon-shadow" :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" alt="">
                <div class="temperature-container">
                    <h4 class="temperature">{{ currentWeather.temp.toFixed(0) }}°</h4>
                    <p class="min-max">{{ dailyWeather[0].temp.max.toFixed(0) + "°" + "/" + dailyWeather[0].temp.min.toFixed(0) + "°" }}</p>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'WeatherWidgetSmall',
    props: {
        
    },
    components: {

    },
    computed: {
        ...mapGetters(['currentWeather', 'dailyWeather'])
    }
}
</script>

<style lang="scss" scoped>
.current-weather-small-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.temperature-container {
    margin-top: -1.4rem;
}
</style>