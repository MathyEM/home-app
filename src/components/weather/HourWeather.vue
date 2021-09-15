<template>
    <div class="weather-hour">
        <div class="date-time">
            <h5 class="date">{{ date }}</h5>
            <p class="time">{{ time }}</p>
        </div>
        <!-- <img
            :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
            :alt="'vejrikon med ' + hour.weather[0].description"
            class="icon icon-shadow"
        > -->
        <div class="icon-wrapper weather-icon">
            <i :class="`owf owf-fw owf-3x owf-${$store.state.weather.getIconWithSuffix(hour.weather[0].icon, hour.weather[0].id)}`"></i>
        </div>
        <div class="temp-rain">
            <p class="temp">{{ hour.temp.toFixed(0) + "°" }}</p>
            <p v-if="hour.rain" class="rain">{{ hour.rain['1h'].toString().replace('.', ',') + "mm" }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HourWeather',
    props: {
        hour: {
            type: Object,
            required: true,
        }
    },
    computed: {
        date() {
            const options = { month: '2-digit', day: '2-digit' }
            let date = new Date(1000*this.hour.dt).toLocaleString('da-DK', options)
            date = date.replace('.','/')

            return date
        },
        time() {
            const options = { hour: '2-digit', minute: '2-digit' }
            let time = new Date(1000*this.hour.dt).toLocaleTimeString('da-DK', options)
            time = time.replace('.', ':').replace(' ', '\n- ')

            return time
        }
    },
}
</script>

<style lang="scss" scoped>
.weather-hour {
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    
    &:not(:last-child) {
        border-bottom: 1px solid $border-color;
    }

    .weather-icon {
        width: min-content;
        justify-self: center;
    }
}
.date-time {
    margin-left: 2.5rem;
    justify-self: flex-start;
}

.date, .time {
    font-size: 1.6rem;
}

.temp-rain {
    margin-left: 2rem;
    justify-self: center;
    font-size: 1.6rem;
}
</style>