<template>
    <div v-if="current && daily" class="current-weather">
        <div class="current-weather-container">
            <div class="current-weather-wrapper">
                <h3 class="location">Kolding</h3>
                <div class="icon-temp-row">
                    <img class="weather-icon icon-shadow" :src="`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`" alt="">
                    <div class="temperature-container">
                        <h4 class="temperature">{{ current.temp.toFixed(0) }}°</h4>
                        <p class="min-max">{{ daily[0].temp.max.toFixed(0) + "°" + "/" + daily[0].temp.min.toFixed(0) + "°" }}</p>
                    </div>
                </div>
                <p class="weather-description">{{ current.weather[0].description }}</p>
            </div>
        </div>
        <div class="expand-hourly-weather-wrapper" @click="showHourly = !showHourly">
            <span
                class="expand-hourly-weather"
                :class="{ 'show-hourly': showHourly }"
            ></span>
        </div>
        <transition name="slide-fade">
            <div v-if="showHourly" class="hourly-weather">
                <div class="hourly-weather-wrapper">
                    <HourWeather v-for="(hour, index) in hourlyWeather" :key="index" :hour="hour" />
                </div>
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
        current: {
            type: Object,
            required: true,
        },
        daily: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            showHourly: false,
        }
    },
    computed: {
        ...mapGetters(['hourlyWeather']),
    }
}
</script>

<style lang="scss" scoped>
.current-weather {
    position: relative;
}
.current-weather-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $border-color;

    .weather-icon {
        margin: -10% -8%;
        padding: 5px;
        justify-self: right;
    }
    .temperature-container {
        justify-self: left;
        padding: 1em;
    }
}
.current-weather-wrapper {
    margin-right: 5px;
}
.expand-hourly-weather-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    user-select: none;
    width: 2em;
    height: 2em;
}
.expand-hourly-weather {
    font-size: 1.75rem;
    writing-mode: vertical-rl;

    &::before {
        content: '+';
    }

    &.show-hourly {
        transform: rotateZ(90deg);
        &::before {
            content: '\2212';
        }
    }
}
.hourly-weather {
    position: absolute;
    z-index: 10;
    margin-top: -1px;
    overflow-y: auto;
    background: white;
    border: 1px solid $border-color;
    padding: 0.25em;
    width: 100%;
}
.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
}
.slide-fade-enter-to, .slide-fade-leave, .hourly-weather {
    height: 435px;
}
.slide-fade-enter, .slide-fade-leave-to {
    height: 0;
    opacity: 0;
}
.weather-description {
    margin-top: 10px;

    &::first-letter {
        text-transform: uppercase;
    }
}
.icon-temp-row {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
}
.min-max {
    margin-top: 2px;
}
</style>

<style lang="scss">
.icon-shadow {
    filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.5));
}
</style>