<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<WeatherWidget />
	</div>
</template>

<script lang="ts">
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
