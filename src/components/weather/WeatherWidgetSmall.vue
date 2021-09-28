<template>
    <div v-if="currentWeather && dailyWeather" class="current-weather-small-container" @click="updateWeather">
            <div class="current-weather-small-wrapper">
                <!-- <img class="weather-icon icon-shadow" :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" alt=""> -->
                <div class="icon-wrapper" :class="{ 'weather-updating': WeatherUpdating }">
                    <i :class="`owf owf-fw owf-5x owf-${$store.state.weather.getIconWithSuffix(currentWeather.weather[0].icon, currentWeather.weather[0].id)}`"></i>
                </div>
                <div class="temperature-container">
                    <h4 class="temperature">{{ currentWeather.temp.toFixed(0) }}°</h4>
                    <p class="min-max">{{ dailyWeather[0].temp.max.toFixed(0) + "°" + "/" + dailyWeather[0].temp.min.toFixed(0) + "°" }}</p>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'WeatherWidgetSmall',
    props: {
        
    },
    data() {
        return {
            WeatherUpdating: false,
        }
    },
    components: {

    },
    computed: {
        ...mapGetters(['currentWeather', 'dailyWeather']),
    },
    methods: {
        ...mapActions(['searchLocation']),
        async updateWeather() {
            this.WeatherUpdating = true
            await this.searchLocation()
            this.WeatherUpdating = false
        }
    }
}
</script>

<style lang="scss" scoped>
.current-weather-small-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .icon-wrapper {
        font-size: 1.6rem;

        &.weather-updating {
            filter: blur(2px);
        }
    }
}
.temperature-container {
    margin-top: -0.8rem;
    font-size: 1.6rem;
}
</style>