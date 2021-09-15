<template>
    <div v-if="current && daily" class="current-weather">
        <div class="current-weather-container">
            <div class="current-weather-wrapper">
                <div class="column-one">
                    <h3 class="location">Kolding</h3>
                    <p class="weather-description">{{ current.weather[0].description }}</p>
                </div>
                <!-- <img class="" :src="`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`" alt=""> -->
                <div class="icon-wrapper weather-icon">
                    <i :class="`owf owf-fw owf-5x owf-${$store.state.weather.getIconWithSuffix(current.weather[0].icon, current.weather[0].id)}`"></i>
                </div>
                <div class="temperature-container">
                    <h4 class="temperature">{{ current.temp.toFixed(0) }}°</h4>
                    <p class="min-max">{{ daily[0].temp.max.toFixed(0) + "°" + "/" + daily[0].temp.min.toFixed(0) + "°" }}</p>
                </div>
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
        justify-self: right;
    }
    .temperature-container {
        justify-self: left;
        // padding: 1em;
    }
}
.current-weather-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2rem 0 0;

    .column-one {
        text-align: left;
        align-self: center;
    }
}
.expand-hourly-weather-wrapper {
    display: flex;
    position: absolute;
    top: 0;
    right: 1em;
    cursor: pointer;
    user-select: none;
}
.expand-hourly-weather {
    font-size: 5.5rem;
    line-height: 3rem;
    outline: none;
    // writing-mode: vertical-rl;

    &::before {
        content: '+';
        display: inline-block;
        -webkit-tap-highlight-color:  transparent; 
    }

    &.show-hourly {
        // transform: rotateZ(90deg);
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
    height: 69vh;
    border-bottom-left-radius: $widget-border-radius;
    border-bottom-right-radius: $widget-border-radius;
}
.slide-fade-enter, .slide-fade-leave-to {
    height: 0;
    opacity: 0;
}
.weather-description {
    // margin-top: -0.5rem;
    // margin-bottom: 1rem;
    &::first-letter {
        text-transform: uppercase;
    }
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