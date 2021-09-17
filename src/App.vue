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
				</div>
			</div>
		</div>
		<router-view/>
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
	}
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

// .icon-wrapper i {
// 	color: #55616d;
// }

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
</style>
