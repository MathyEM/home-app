<template>
	<div class="calendar-container">
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
				eventSources: this.eventSources,
				locale: daLocale,
				weekNumbers: true,
				weekNumberFormat: { week: 'numeric' },
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
		}
	},
	methods: {
		...mapActions(['setEventSources']),

		handleDateClick: function(arg) {
			console.log(arg.event)
		}
	},
	async beforeCreate() {
		this.$store.dispatch('setEventSources')
	},
	async created() {

	},
	mounted() {
		this.calendarApi = this.$refs.fullCalendar.getApi()
	}
}
</script>