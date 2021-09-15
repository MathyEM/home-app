<template>
	<div class="home">
		<div class="widget-container">
			<HueWidget />
			<WeatherWidget />
			<CalendarWidget />
			<TodosWidget />
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import WeatherWidget from '@/components/home/WeatherWidget.vue'
import CalendarWidget from '@/components/home/CalendarWidget.vue'
import TodosWidget from '@/components/home/TodosWidget.vue'
import HueWidget from '@/components/home/HueWidget.vue'

export default Vue.extend({
	name: 'Home',
	components: {
		WeatherWidget,
		CalendarWidget,
		TodosWidget,
		HueWidget,
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
.widget-container {
	display: grid;
	padding: 1rem 0.5rem;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}
.widget {
	border: 1px solid #E4E4E4;
	border-radius: $widget-border-radius;
	background: rgba(245, 245, 245, 0.99);
	padding: 0.5rem;
	height: 95vh;
	overflow-y: auto;
	display: grid;
	grid-template-rows: min-content auto;
}

// @media screen and (max-width: $lg-scrn) {
// 	.widget-container {
// 		grid-template-columns: repeat(3, 1fr);
// 	}
// }
// @media screen and (max-width: $md-scrn) {
// 	.widget-container {
// 		grid-template-columns: repeat(2, 1fr);
// 	}
// }
// @media screen and (max-width: $xs-scrn) {
// 	.widget-container {
// 		grid-template-columns: repeat(1, 1fr);
// 	}
// }
</style>

<style lang="scss">
.widget {
	& > h2 {
		padding: 1rem 0;
		font-size: 2.2rem;
		font-weight: normal;
		border-bottom: 1px solid $border-color;
	}

}
</style>