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
		disableContextMenu() {
			const briDimBtns = document.querySelectorAll('button.btn-brighten, button.btn-dim')
			if (!briDimBtns.length>0) {
				console.log("is false", briDimBtns);
				setTimeout(this.disableContextMenu, 100)
			} else {
				for (const btn in briDimBtns) {
					if (Object.hasOwnProperty.call(briDimBtns, btn)) {
						const element = briDimBtns[btn];
						console.log(btn, element);
						element.addEventListener('contextmenu', e => {
							e.preventDefault();
						});
					}
				}
			}
			
		}
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

		this.$nextTick(() => {
			this.disableContextMenu()
		})
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
	// font-size: 1.6rem;
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
	font-size: 1.4rem;

	.entity-container {
		margin: 0 1.5em;
		display: flex;

		.entity-wrapper {
			width: 16.5em;
			padding: 1em;
			margin-bottom: 2em;
			padding-left: calc(1em + 4px);
			padding-bottom: calc(1em + 4px);
			user-select: none;

			.hue-switch-container {
				width: 6em;
				height: 15em;
				user-select: none;
				
				button {
					user-select: none;

					& > div {
						user-select: none;
					}

					&:focus-visible {
						outline: none;
					}
				}
			}
		}
	}

	.group-header {
		gap: 2rem;

		.group-controls {
			.switch-container {
				button {
					width: 4em;
					font-size: 1.2rem;
					outline: none;

					&:focus-visible {
						outline: none;
					}
				}
			}
			.color-temperature {
				width: 22em;
				margin: 0;
			}
		}
	}

	$thumb-width: 46px;
	$thumb-height: 46px;
	$track-height: 36px;
	$thumb-margin-top: ( $thumb-height * -0.5 ) + ( $track-height * 0.5 );

	* {
		--thumb-color: #efefef;
	}

	.color-picker-wrapper {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		padding: 0 2rem;
		margin-top: 0.5rem;

		& > div {
			// padding: 3.6rem;
			justify-self: center;
			align-self: center;
			padding: 0 3rem;

			$thumb-width: 46px;
			$thumb-height: 46px;
			$track-height: 36px;
			$thumb-margin-top: ( $thumb-height * -0.53 ) + ( $track-height * 0.5 );

			$satLumPosition: 5%;

			.luminosity {
				left: $satLumPosition;
			}

			.saturation {
				left: 100%-$satLumPosition;
			}

			.luminosity, .saturation {
				width: 70%;
				&:focus {
					outline: none;
				}

				&::-webkit-slider-thumb {
					border: 1px solid $border-color;
					width: $thumb-width;
					height: $thumb-height;
					border-radius: 0px;
					background: var(--thumb-color);
					margin-top: $thumb-margin-top; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
				}
				&::-webkit-slider-runnable-track {
					height: $track-height;
					border-radius: 0px;
					border: 1px solid darken($border-color, 15%);
				}
			}
		}

		.rcp.color-picker {
			$margin: 2.5rem;

			transform: scale(1.4);
			width: 10rem;
			height: 10rem;
			margin-top: $margin;
			margin-bottom: $margin;

			&[aria-expanded=false] {
				margin: -0.8*$margin 0;
			}
		}

		.rcp__palette {
			mask-size: 80%;
			mask-position: 50% 50%;
			// mask-repeat: no-repeat;
			// background-size: 110% 110%;
		}

		.rcp__well {
			transform: scale(1.2);
		}

	}

	.color-temperature {
		&:focus {
			outline: none;
		}

		&::-webkit-slider-thumb {
			border: 1px solid $border-color;
			width: $thumb-width;
			height: $thumb-height;
			border-radius: 0px;
			background: var(--thumb-color);
			margin-top: $thumb-margin-top; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
		}
		&::-webkit-slider-runnable-track {
			height: $track-height;
			border-radius: 0px;
			border: 1px solid darken($border-color, 15%);
		}
	}
}
</style>
