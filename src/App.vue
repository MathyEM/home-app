<template>
	<div id="app">
		<div class="header">
			<div class="header-content">
				<div class="header-weather">
					<WeatherWidgetSmall />
				</div>
				<div id="nav">
					<router-link to="/" @click.native="scrollToTop">
						<img src="@/assets/img/home.svg" alt="">
						<p>Home</p>
					</router-link>
					<router-link to="/hueapp" @click.native="scrollToTop">
						<img src="@/assets/img/light-bulb.svg" alt="">
						<p>Lys</p>
					</router-link>
					<router-link to="/calendar" @click.native="scrollToTop">
						<img src="@/assets/img/calendar.svg" alt="">
						<p>Kalender</p>
					</router-link>
					<router-link to="/todolist" @click.native="scrollToTop">
						<img src="@/assets/img/checklist.svg" alt="">
						<p>Huskeseddel</p>
					</router-link>
					<!-- {{ windowWidth }} -->
				</div>
			</div>
		</div>
		<router-view class="main-content-container"/>
	</div>
</template>

<script>
import WeatherWidgetSmall from '@/components/weather/WeatherWidgetSmall.vue'
export default {
	components: {
		WeatherWidgetSmall,
	},
	methods: {
		scrollToTop() {
			window.scrollTo(0, 0);
		}
	},
	computed: {
		windowWidth() {
			const width = window.innerHeight
			console.log(width);
			return width;
		}
	},
}


</script>

<style lang="scss">
@import url('~@/assets/css/owfont-regular.css');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

:root {
	height: 100vh;
	// filter: invert(100%) hue-rotate(180deg);
}

// .invert {
// 	filter: invert(100%) hue-rotate(180deg);
// }

// #brightness, #color-temperature, #luminosity, #saturation {
// 	&::-webkit-slider-runnable-track, &::-webkit-slider-thumb {
// 		filter: invert(1) hue-rotate(180deg);
// 	}
// }

::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: transparent;
}

::-webkit-scrollbar {
	width: 10px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: gray;
}

body {
	height: 100%;
	background: white;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $base-font-color;
	display: grid;
	grid-template-columns: auto min-content;
	height: 100%;

	&>:not(div.home, div.header) {
		padding: 2.2rem;
	}
}

#app, input#updatedTodo {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

.header {
	grid-column: 2;
	order: 1;
	background: rgb(245, 245, 245);
	height: 100%;
	padding: 0 1rem;
	border-left: 1px solid $border-color;

	.header-content {
		position: sticky;
		top: 0;
		height: 100vh;
		display: grid;
		grid-template-rows: min-content auto;
	}
}

.header-weather {
	pointer-events: none;
	margin-bottom: 2rem;
}

#nav {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding-bottom: 3rem;

	a {
		font-weight: bold;
		color: #2c3e50;
		margin-bottom: 2rem;

		img {
			width: 50%;
			filter: contrast(0.5);
		}

		&.router-link-exact-active.router-link-active img {
			filter: contrast(1);
		}

		p {
			font-size: 1.4rem;
		}

		&.router-link-exact-active {
			color: #3eac7a;
		}
	}
}

@media screen and (max-width: 900px) {
	$widget-height: 86vh;

	:root {
		font-size: 8px;
	}
	div#app {
		grid-template-rows: auto min-content;
		position: relative;
		
		.widget-container {
			grid-template-columns: none;

			.widget {
				height: $widget-height - 10;
			}
		}

		div.main-content-container.todo-list-container {
			font-size: unset;
			padding: 1rem;
			width: 100%;
		}

		div.container.main-content-container {
			padding: 0;
			font-size: 2.2rem;
		}

		& > div.main-content-container, div.main-content-container.calendar-container, div.main-content-container.todo-list-container, div.container.main-content-container {
			padding-bottom: 100-$widget-height;
		}
	}

	.header {
		grid-column: unset;
		grid-row: 2;
		order: 1;
		height: 100-$widget-height;
		width: 100%;
		z-index: 10;
		border: none;
		border-top: 1px solid $border-color;
		position: fixed;
		bottom: 0;
		display: flex;

		.header-content {
			top: unset;
			position: initial;
			height: initial;
			grid-template-rows: unset;
			grid-template-columns: min-content auto;
			align-items: center;
			width: 100%;

			.header-weather {
				margin: 0;
			}

			.icon-wrapper, .temperature-container, #nav a p {
				font-size: 1.3rem;
			}

			#nav {
				flex-direction: row;
				padding: 0;
				display: grid;
				grid-template-columns: repeat(4, 1fr);

				a {
					margin: 0;
				}
			}
		}
	}

	div.container.main-content-container.container {

		.entity-container .entity-wrapper .hue-switch-container button .icon-wrap {
			font-size: 2.5rem;
		}

		.color-picker-wrapper {
			& > div {
				justify-self: center;
				align-self: center;
				padding: 1em 3em;

				$thumb-width: 3.5rem;
				$thumb-height: 4rem;
				$track-height: 3.25rem;
				$thumb-margin-top: ( $thumb-height * -0.53 ) + ( $track-height * 0.5 );

				$satLumPosition: 1em;

				.luminosity {
					left: $satLumPosition;
				}

				.saturation {
					left: calc(100% - $satLumPosition);
				}

				.luminosity, .saturation {
					width: 14em;

					&::-webkit-slider-thumb {
						width: $thumb-width;
						height: $thumb-height;
					}
					&::-webkit-slider-runnable-track {
						height: $track-height;
					}
				}
			}
			.color-temperature {
				width: 17em;
			}
		}

		.rcp.color-picker {
			$margin: 0.5em;

			transform: scale(1.2);
			width: 20rem;
			height: 20rem;
			margin-top: $margin;
			margin-bottom: $margin;

			&[aria-expanded=false] {
				margin: -0.8*$margin 0;
			}
		}
	}
}
</style>
