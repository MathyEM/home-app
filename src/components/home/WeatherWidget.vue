<template>
	<div class="weather-widget widget">
        <h3>Vejr</h3>
		<CurrentWeather />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CurrentWeather from '@/components/weather/CurrentWeather.vue'

export default {
	name: 'WeatherWidget',
	components: {
        CurrentWeather
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
};
</script>

<style lang="scss" scoped>
    .weather-widget {
        h3 {
            margin-bottom: 0.5rem;
        }
    }
</style>