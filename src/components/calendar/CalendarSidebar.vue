<template>
	<div class="container">
		<input type="checkbox" name="toggle-sidebar" id="toggle-sidebar" class="toggle-sidebar">
		<div class="calendar-sidebar">
			<section class="calendars">
				<div class="calendar" v-for="(eventSource, index) in eventSources" :key="index">
					<label>
						<input type="checkbox" class="checkbox" checked="true" v-bind:value="eventSource.id" v-on:change="toggleEventSources"><p>{{ eventSource.name }}</p>
					</label>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	name: "CalendarSidebar",
	props: {
		eventSources: {
			type: Array,
			required: true
		},
		calendarApi: {
			type: undefined
		}
	},
	data() {
		return {
			toggleEventSources: (event) => {
				let checked = event.target.checked
				let value = event.target.value
				let calendarApi = this.calendarApi

				if (checked) { //add event source
					let newEventSource = this.eventSources.find(element => element.id = value)
					calendarApi.addEventSource(newEventSource)
				} else { //remove event source
					let eventSource = calendarApi.getEventSourceById(value)
					eventSource.remove()
				}
			}
		}
	},
	computed: {

	},
	methods: {
	},
	mounted() {
		this.$nextTick().then(() => {
			let html = `<label for="toggle-sidebar">
						<a class="toggle-sidebar-btn">☰</a>
					</label>`
			const template = document.createElement('template');
			html = html.trim(); // Never return a text node of whitespace as the result
			template.innerHTML = html;

			const title = document.querySelector('.fc-toolbar-chunk .fc-toolbar-title')
			title.parentNode.appendChild(template.content.firstChild)
		})
	}
}
</script>

<style lang="scss">
.toggle-sidebar-btn {
	padding: 5px;
	text-decoration: none;
	cursor: pointer;
	font-size: 2rem;
	display: inline;
	user-select: none;
}
.fc .fc-toolbar-chunk .fc-toolbar-title {
	display: inline;
}
</style>
<style lang="scss" scoped>
.container {
	position: absolute;
	margin-top: 3rem;
}

.toggle-sidebar {
	visibility: hidden;
	height: 0;
	widows: 0;

	&:checked {
		& ~ .calendar-sidebar {
			display: block;
		}
	}
}

.calendar-sidebar {
	position: absolute;
	z-index: 10;
	width: 300px;
	line-height: 1.5;
	background: #eaf9ff6b;
	border-right: 1px solid #d3e2e8;
	text-align: left;
	display: none;

	.checkbox, p {
		display: inline;
		padding: 5px;

	}

	section {
		padding: 2rem;
	}
}
</style>