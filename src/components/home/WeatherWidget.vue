<template>
	<div class="weather-widget widget">
        <h2>Vejr</h2>
        <div class="widget-content-container">
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
	},
	async beforeCreate() {
	},
};
</script>

<style lang="scss" scoped>
    .weather-widget {
        .widget-content-container {
            padding-top: 1rem;
        }
    }
</style>