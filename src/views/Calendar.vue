<template>
	<div class="calendar-container">
		<button v-on:click="logEventSource">log eventSource</button>
		<button v-on:click="removeEventSource">remove eventSource</button>
		<button v-on:click="addEventSource">add eventSource</button>
		<CalendarSidebar :eventSources="eventSources" :calendarApi="calendarApi" />
		<FullCalendar ref="fullCalendar" :options="calendarOptions" />
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CalendarSidebar from '../components/calendar/CalendarSidebar'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import daLocale from '@fullcalendar/core/locales/da';

export default {
	name: "Calendar",
	components: {
		FullCalendar, // make the <FullCalendar> tag available
		CalendarSidebar,
	},
	computed: {
		...mapGetters(['events', 'eventSources']),

		calendarOptions() {
			return {
				plugins: [ dayGridPlugin, interactionPlugin ],
				initialView: 'dayGridMonth',
				eventClick: this.handleDateClick,
				//events: this.events,
				eventSources: this.eventSources,
				locale: daLocale,
				eventTimeFormat: {
					hour: '2-digit',
					minute: '2-digit',
					meridiem: false
				},
				height: "100%",
			}
		},
	},
	data() {
		return {
			calendarApi: Object,
			logEventSource: () => {
				let personal = this.calendarApi.getEventSourceById('personal')
				console.log(personal);
			},
			removeEventSource: () => {
				let personal = this.calendarApi.getEventSourceById('personal')
				personal.remove()
			},
			addEventSource: () => {
				let personal = this.calendarApi.getEventSourceById('personal')
				personal
				this.calendarApi.refetchEvents()
			}
		}
	},
	methods: {
		...mapActions(['setEventSources']),

		handleDateClick: function(arg) {
			console.log(arg.event)
		}
	},
	async created() {
		// await this.setEventSources()

		
		
		// console.log(personal.internalEventSource._raw)
	},
	mounted() {
		this.calendarApi = this.$refs.fullCalendar.getApi()
	}
}
</script>