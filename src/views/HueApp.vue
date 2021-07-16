<template>
	<div class="container">
		<GroupList />
		<template v-for="group, g_index in groups">
			<GroupEntities :key="g_index" :group="group" :id="g_index" />
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfigProvider from '../ConfigProvider'

export default {
	name: 'App',
	components: {

	},
	data() {
		return {
			pollingInterval: ConfigProvider.value('pollingRate') || 8000,
			updateHueStateInterval: Function,
		};
	},
	computed: {
		...mapGetters(['groups', 'localGroupColors']),
	},
	methods: {
		...mapActions(['updateLocalLights']),
	},
	async mounted() {

	},
	async created() {
		var self = this;

		this.$data.updateHueStateInterval = setInterval(() => {
			console.log("interval call");
			self.updateLocalLights();
		}, this.$data.pollingInterval)

		this.updateLocalLights();
	},
	beforeDestroy() {
		console.log('destroyed')
		clearInterval(this.updateHueStateInterval)
	}
}
</script>

<style lang="scss">
@import '~local-hue-app/local-hue-app.css';

:root {
	scroll-behavior: smooth;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	padding: 0 2rem;

	.entity-container {
		margin: 0 1.5rem;
		display: flex;

	}
}
</style>
