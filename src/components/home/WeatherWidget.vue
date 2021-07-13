<template>
	<div class="weather-widget widget">
        <h3>Vejr</h3>
		<template v-if="currentWeather && dailyWeather">
            <CurrentWeather
                    
                        :current="currentWeather"
                        :daily="dailyWeather"
                    />
        </template>
        <template v-if="dailyWeather">
            <DailyWeather
                v-for="(daily, index) in dailyWeather"
                :daily="daily"
                :key="index"
            />
        </template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CurrentWeather from '@/components/weather/CurrentWeather.vue'
import DailyWeather from '@/components/weather/DailyWeather.vue'

export default {
	name: 'WeatherWidget',
	components: {
        CurrentWeather,
        DailyWeather,
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
</style>