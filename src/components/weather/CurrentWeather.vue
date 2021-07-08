<template>
    <div v-if="currentWeather && dailyWeather" class="current-weather">
        <div class="current-weather-container">
            <div class="current-weather-wrapper">
                <h5 class="location">Kolding</h5>
                <div class="icon-temp-row">
                    <img class="weather-icon" :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" alt="">
                    <div class="temperature-container">
                        <h4 class="temperature">{{ currentWeather.temp.toFixed(0) }}°</h4>
                        <p class="min-max">{{ dailyWeather[0].temp.max.toFixed(0) + "°" + "/" + dailyWeather[0].temp.min.toFixed(0) + "°" /*convertUnixDate(currentWeather.dt)*/ }}</p>
                    </div>
                </div>
                <p class="weather-description">{{ currentWeather.weather[0].description }}</p>
            </div>
            <span
                class="expand-hourly-weather"
                :class="{ 'show-hourly': showHourly }"
                @click="showHourly = !showHourly"
            >ᐳ</span>
        </div>
        <transition name="slide-fade">
            <div v-if="showHourly" class="hourly-weather">
                <HourWeather v-for="(hour, index) in hourlyWeather" :key="index" :hour="hour" />
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HourWeather from '@/components/weather/HourWeather.vue'


export default {
    name: 'CurrentWeather',
    components: {
        HourWeather
    },
    props: {

    },
    data() {
        return {
            showHourly: false,
        }
    },
    computed: {
        ...mapGetters(['currentWeather', 'dailyWeather', 'hourlyWeather']),
    }
}
</script>

<style lang="scss" scoped>
.current-weather-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid darkgrey;
}
.current-weather-wrapper {
    margin-right: 5px;
}
.expand-hourly-weather {
    font-size: 1.75rem;
    line-height: 1.75em;
    width: 1.75em;
    position: absolute;
    right: 0;
    cursor: pointer;
    user-select: none;

    &.show-hourly {
        transform: rotateZ(90deg);
    }
}
.hourly-weather {
    overflow-y: auto;
}
.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
}
.slide-fade-enter-to, .slide-fade-leave, .hourly-weather {
    height: 200px;
}
.slide-fade-enter, .slide-fade-leave-to {
    height: 0;
    opacity: 0;
}
.weather-icon {
    filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.5));
    margin: -10% -8%;
    padding: 5px;
}
.weather-description {
    margin-top: 10px;

    &::first-letter {
        text-transform: uppercase;
    }
}
.icon-temp-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
.min-max {
    margin-top: 2px;
}
</style>