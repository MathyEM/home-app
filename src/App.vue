<template>
	<div id="app">
		<div class="header">
			<div id="nav">
				<div class="header-weather">
					<WeatherWidgetSmall />
				</div>
				<router-link to="/">Home</router-link>
				<router-link to="/calendar">Kalender</router-link>
				<router-link to="/todolist">Huskeseddel</router-link>
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
	color: $base-font-color;
	display: grid;
	grid-template-columns: auto min-content;
	height: 100%;
}

#app, input#updatedTodo {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

.header {
	grid-column: 2;
	order: 1;
	background: rgba(245, 245, 245, 0.99);
	padding: 0 1.4rem;
}

.header-weather {
	pointer-events: none;
	margin-bottom: 2rem;
}

#nav {
	display: flex;
	flex-direction: column;
	position: sticky;
	margin-top: -0.6rem;
	top: 0;

	a {
		font-weight: bold;
		color: #2c3e50;
		margin-bottom: 2rem;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
