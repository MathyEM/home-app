<template>
    <div class="hue-widget-container widget">
        <h2>Lys</h2>
        <div class="widget-content-container">
			<template v-for="group, g_index in groups">
				<HueEntitySmall :colorTemperatureStep="34.7" :brightnessStep="15.8125" :key="g_index" :isGroup="true" :id="g_index" />
			</template>
		</div>
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
    .hue-widget-container {
        .small-entity-wrapper {
            box-shadow: none;
            background: initial;
            width: 100%;
			margin: 0;

			&:not(:first-child) {
				border-top: 1px solid $border-color;
				border-radius: 0;
			}

            h3 {
                margin: 0;
				font-weight: normal;
				font-size: 2rem;
            }

            .control-wrapper {
				grid-template-columns: 0.7fr 2fr;

				.switch-container.on-off-switch {
					height: auto;

					button {
						font-size: 1.8rem;
						outline: none;

						&.on, &:active {
							background-color: #c1c1c1;
							border-color: #b2b2b2;
							border-width: 2px;
						}

						&:focus-visible {
							outline: none;
						}
					}
				}

				.color-title-wrapper {
					.single-control-wrapper {
						padding-top: 0.5rem;
						
						input {
							padding: 0.5rem;
							width: 100%;
							border: none;
						}
					}
				}
			}
			
        }

		$thumb-width: 64px;
		$thumb-height: 72px;
		$track-height: 52px;
		$thumb-margin-top: ( $thumb-height * -0.5 ) + ( $track-height * 0.5 );

		* {
			--thumb-color: #efefef;
		}

		.color-temperature, .brightness {
			position: relative; // This makes the slider clickable even when the color wheel is overlapping
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			-webkit-appearance: none;
			background: transparent;

			&:focus {
				outline: none;
			}

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				border: 1px solid #cfcfcf;
				width: $thumb-width;
				height: $thumb-height;
				border-radius: 0px;
				background: var(--thumb-color);
				cursor: pointer;
				justify-self: center;
				margin-top: $thumb-margin-top; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
			}
			&::-webkit-slider-runnable-track {
				cursor: pointer;
				height: $track-height;
				border: none;
				border-radius: 0px;
				border: 1px solid darken($border-color, 15%);
			}
		}
    }
</style>