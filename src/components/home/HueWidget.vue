<template>
    <div class="calendar-widget-container widget">
        <h3>Lys</h3>
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

<style lang="scss">
    .calendar-widget-container {
        .small-entity-wrapper {
            padding: 0.5rem 1rem;
            border-radius: 0;
            box-shadow: none;
            background: initial;
            width: 100%;
            border-bottom: 1px solid $dark-gray;
            margin: 0;

            h3 {
                margin: 0;
            }

            .control-wrapper .on-off-switch {
                margin: 30px 0;
            }
        }
    }
    
</style>