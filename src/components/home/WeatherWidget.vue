<template>
	<div class="weather-widget widget">
        <h3>Vejr</h3>
		<div v-if="currentWeather && dailyWeather" class="current-weather">
            <h5 class="location">Kolding</h5>
            <h4 class="temperature">{{ currentWeather.temp.toFixed(0) }}°</h4>
            <p>{{ dailyWeather[0].temp.max.toFixed(0) + "°" + "/" + dailyWeather[0].temp.min.toFixed(0) + "°" /*convertUnixDate(currentWeather.dt)*/ }}</p>
            <img class="weather-icon" :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`" alt="">
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
	name: 'WeatherWidget',
	components: {

	},
	computed: {
		...mapGetters(['weatherCache', 'currentWeather', 'hourlyWeather', 'dailyWeather']),
        
	},
	methods: {
		...mapActions(['searchLocation']),
        convertUnixDate(unixDate) {
            const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
            let date = new Date(unixDate*1000).toLocaleString('da-DK', options)
            return date

        },

	},
	async beforeCreate() {
		this.$store.dispatch('searchLocation', { })
	},
});
</script>

<style lang="scss" scoped>
    .weather-widget {
        h3 {
            margin-bottom: 0.5rem;
        }
        .weather-icon {
            filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.5));
        }
    }
</style>