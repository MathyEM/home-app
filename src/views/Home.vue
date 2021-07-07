<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<div class="widget-container">
			<WeatherWidget />
			<div class="calendar-widget widget">
				<h3>Kalender</h3>
			</div>
			<div class="todo-widget widget">
				<h3>Huskeseddel</h3>
			</div>
			<div class="hue-widget widget">
				<h3>Hue</h3>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import WeatherWidget from '@/components/home/WeatherWidget.vue'

export default Vue.extend({
	name: 'Home',
	components: {
		WeatherWidget,
	},
	computed: {
	},
	methods: {

	},
	async beforeCreate() {
	},
});
</script>

<style lang="scss" scoped>
	.home {
		.widget-container {
			display: grid;
			padding: 1rem 2rem;
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
		}
		.widget {
			border: 1px solid darkgray;
			padding: 0.5rem;
		}
	}
</style>