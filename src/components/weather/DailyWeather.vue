<template>
    <div v-if="daily" class="daily-weather">
        <div class="weather-daily">
            <h5 class="date">{{ date }}</h5>
            <img
                :src="`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`"
                :alt="'vejrikon med ' + daily.weather[0].description"
                class="icon icon-shadow"
            >
            <div class="temp-rain">
                <p class="min-max">{{ daily.temp.max.toFixed(0) + "°" + "/" + daily.temp.min.toFixed(0) + "°" }}</p>
                <p v-if="daily.rain" class="rain">{{ daily.rain.toString().replace('.', ',') + "mm" }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DailyWeather',
    props: {
        daily: {
            type: Object,
            required: true,
        }
    },
    computed: {
        date() {
            const options = { month: 'short', day: '2-digit', weekday: 'short' }
            let date = new Date(1000*this.daily.dt).toLocaleString('da-DK', options)
            // date = date.replace('.','/')

            return date
        },
    }
}
</script>

<style lang="scss" scoped>
.daily-weather {
    margin-top: 0.25em;
    
    &:not(:last-child) {
        border-bottom: 1px solid $border-color;
    }
}
.weather-daily {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
}
.icon {
    height: 50px;
    justify-self: center;
}
</style>