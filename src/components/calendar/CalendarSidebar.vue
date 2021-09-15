<template>
	<div class="calendar-sidebar-container">
		<input type="checkbox" name="toggle-sidebar" id="toggle-sidebar" class="toggle-sidebar">
		<div class="calendar-sidebar">
			<section class="calendars">
				<div class="calendar" v-for="(eventSource, index) in eventSources" :key="index">
					<div class="checkbox-title">
						<label>
							<input :id="eventSource.id + index" type="checkbox" class="checkbox" checked="true" v-bind:value="eventSource.id" v-on:change="toggleEventSources">
						</label>
						<label :for="eventSource.id + index">
							<p>{{ eventSource.name }}</p>
						</label>
					</div>
					<v-swatches 
						v-model="eventSource.color"
						v-on:input="changeEventSourceColor(index, eventSource.id, $event)"
						:swatches="swatches"
						row-length="3"
						popover-x="right"
					></v-swatches>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import VSwatches from 'vue-swatches'

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'

export default {
	name: "CalendarSidebar",
	components: {
		VSwatches,
	},
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
				let id = event.target.value

				if (checked) { //add event source
					this.addEventSource(id)
				} else { //remove event source
					this.removeEventSource(id)
				}
			},
			changeEventSourceColor: (index, id, color) => {
				this.$store.dispatch('setEventSourceColor', {index, id, color})
				this.refreshEventSource(id)
				this.setLocalStorageEventSourceColors({id: id, color: color})
			},
			refreshEventSource(eventSourceId) {
				this.removeEventSource(eventSourceId)
				this.addEventSource(eventSourceId)
			},
			removeEventSource: (eventSourceId) => {
				let eventSource = this.calendarApi.getEventSourceById(eventSourceId)
				eventSource.remove()
			},
			addEventSource: (eventSourceId) => {
				let newEventSource = this.eventSources.find(element => element.id === eventSourceId)
				this.calendarApi.addEventSource(newEventSource)
			}
		}
	},
	computed: {
		...mapGetters(['defaultColorSwatches', 'eventSourceColors']),
		swatches() { return this.defaultColorSwatches },
		eventSourceColors() { return this.eventSourceColors },
	},
	watch: {
		
	},
	methods: {
		...mapActions(['setLocalStorageEventSourceColors']),
		handleClick (event) {
			let checkbox = document.querySelector('#toggle-sidebar')
			if (!event.target.closest('.calendar-sidebar') && !event.target.matches('.toggle-sidebar-btn') && checkbox.checked) {
				document.querySelector('.toggle-sidebar-btn').click()
			}
		}
	},
	mounted() {
		this.$nextTick().then(() => {
			let html = `<label class="toggle-sidebar-label" for="toggle-sidebar">
							<a class="toggle-sidebar-btn">☰</a>
						</label>`
			const template = document.createElement('template');
			html = html.trim(); // Never return a text node of whitespace as the result
			template.innerHTML = html;

			const title = document.querySelector('.fc-toolbar-chunk .fc-toolbar-title')
			title.parentNode.appendChild(template.content.firstChild)

			document.addEventListener("click", this.handleClick)
		})
	},
	beforeDestroy() {
		document.removeEventListener("click", this.handleClick)
	},
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

.fc .fc-toolbar.fc-header-toolbar {
    margin-left: 2rem;
    margin-right: 2rem;
}

</style>
<style lang="scss" scoped>
.calendar-sidebar-container {
	position: absolute;
	margin-top: calc(3rem + 1px);
}

section.calendars {
	.calendar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1em;
	}
}

.toggle-sidebar {
	visibility: hidden;
	height: 0;
	width: 0;

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
	border-bottom: 1px solid #d3e2e8;
	text-align: left;
	display: none;

	.checkbox-title {
		display: grid;
		grid-template-columns: min-content auto;
		align-items: center;
		width: 100%;
		height: 100%;
		text-align: left;

		.checkbox, p {
			display: inline;
		}

		.checkbox {
			height: 1.5em;
			width: 1.5em;
			vertical-align: middle;
		}

		label {
			width: 100%;
			padding-right: 10px;
		}
	}

	section {
		padding: 2rem;
	}
}
</style>