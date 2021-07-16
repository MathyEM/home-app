<template>
    <div class="calendar-widget-container widget">
        <template v-for="group, g_index in groups">
            <HueEntitySmall :key="g_index" :isGroup="true" :id="g_index" />
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfigProvider from '@/ConfigProvider'

export default {
    name: 'HueWidget',
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

<style>

</style>