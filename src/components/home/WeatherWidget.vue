<template>
	<div class="weather-widget-container">
		<div v-if="currentWeather" class="current-weather">
            <p>{{ convertUnixDate(currentWeather.dt) }}</p>
            <p>temp: {{ currentWeather.temp }} C</p>
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
