<template>
	<div class="home">
		<div class="widget-container">
			<HueWidget />
			<WeatherWidget />
			<CalendarWidget />
			<TodosWidget />
			<QRCodeWidget />
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import WeatherWidget from '@/components/home/WeatherWidget.vue'
import CalendarWidget from '@/components/home/CalendarWidget.vue'
import TodosWidget from '@/components/home/TodosWidget.vue'
import HueWidget from '@/components/home/HueWidget.vue'
import QRCodeWidget from '@/components/home/QRCodeWidget.vue'

export default Vue.extend({
	name: 'Home',
	components: {
		WeatherWidget,
		CalendarWidget,
		TodosWidget,
		HueWidget,
		QRCodeWidget,
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
	padding: 1.5rem 0;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem;
	margin: 0 2rem;
}
.widget {
	border: 1px solid $border-color;
	border-radius: $widget-border-radius;
	background: rgb(245, 245, 245);
	padding: 0.5rem;
	height: 95vh;
	overflow-y: auto;
	display: grid;
	grid-template-rows: min-content auto;
	box-shadow: 0px -1px 9px -6px black;
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
h2 {
	font-size: 3rem;
	font-weight: normal;
}

.widget {
	& > h2 {
		padding: 0.75rem 0;
		padding-top: 0.25rem;
		border-bottom: 1px solid $border-color;
	}

}
</style>