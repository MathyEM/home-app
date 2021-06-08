<template>
	<FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import daLocale from '@fullcalendar/core/locales/da';

export default {
	name: "Calendar",
	components: {
		FullCalendar // make the <FullCalendar> tag available
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
				// aspectRatio: 1.8,
				height: "100%",
			}
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		...mapActions(['setEventSources']),

		handleDateClick: function(arg) {
			console.log(arg.event.start.toISOString())
		}
	},
	async created() {
		await this.setEventSources()

		let calendarApi = this.$refs.fullCalendar.getApi()

		let personal = calendarApi.getEventSourceById('personal')

		console.log(personal.internalEventSource._raw)
	},
	mounted() {

	}
}
</script>