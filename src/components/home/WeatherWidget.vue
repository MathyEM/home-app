<template>
	<div class="weather-widget-container">
		
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
	name: 'WeatherWidget',
	components: {
	},
	computed: {
		...mapGetters(['weatherCache'])
	},
	methods: {
		...mapActions(['searchLocation'])

	},
	async beforeCreate() {
		this.$store.dispatch('searchLocation', { })
	},
});
</script>
