<template>
	<div id="app">
		<div class="header">
			<div class="header-weather">
				<WeatherWidgetSmall />
			</div>
			<div id="nav">
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

body {
	height: 100%;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	padding: 0.2rem 0.5rem;
	color: #2c3e50;
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100%;
}

#app, input#updatedTodo {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

.header-weather {
	display: inline-block;
	vertical-align: middle;
}

#nav {
	display: inline-block;
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
