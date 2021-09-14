<template>
	<div id="app">
		<div class="header">
			<div id="nav">
				<div class="header-weather">
					<WeatherWidgetSmall />
				</div>
				<router-link to="/">Home</router-link> |
				<router-link to="/calendar">Kalender</router-link> |
				<router-link to="/todolist">Huskeseddel</router-link> |
				<router-link to="/hueapp">Hue App</router-link>
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
	}
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

:root {
	height: 100vh;
}

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
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	padding: 0.2rem 0.5rem;
	color: $base-font-color;
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100%;
}

#app, input#updatedTodo {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

.header-weather {
	position: absolute;
	left: 0;
	top: 0;
	transform: translateX(-100%);
	pointer-events: none;
}

#nav {
	display: inline-block;
	position: relative;
	padding: 30px 0;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

@media screen and (max-width: $sm-scrn) {
	.header-weather {
		position: relative;
		transform: none;
	}
	.current-weather-small-container {
		display: inline-block;
	}

}
</style>
