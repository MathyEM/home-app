<template>
	<FullCalendar :options="calendarOptions" />
</template>
<script>
import { mapGetters } from 'vuex'

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
		...mapGetters(['events']),

		calendarOptions() {
			return {
				plugins: [ dayGridPlugin, interactionPlugin ],
				initialView: 'dayGridMonth',
				eventClick: this.handleDateClick,
				events: this.events,
				locale: daLocale,
				eventTimeFormat: {
					hour: '2-digit',
					minute: '2-digit',
					meridiem: false
				}
			}
		}
	},
	data() {
		return {
			
		}
	},
	methods: {
		handleDateClick: function(arg) {
			console.log(arg.event.start.toISOString())
		}
	}
}
</script>