<template>
	<div class="calendar-container">
		<CalendarSidebar :eventSources="eventSources" :calendarApi="calendarApi" />
		<FullCalendar ref="fullCalendar" :options="calendarOptions" />
		<SimpleModal v-model="showModal" :title="focusedEventSource.name" :style="'--modal-header-color:' + focusedEventSource.color">
			<template slot="body">
				<h4>{{ focusedEvent.title }}</h4>
				<p v-if="focusedEventDates.start">
					<span class="focused-event-date">{{ focusedEventDates.start }}</span> - 
					<span class="focused-event-date">{{ focusedEventDates.end }}</span>
				</p>
			</template>
		</SimpleModal>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CalendarSidebar from '../components/calendar/CalendarSidebar'
import SimpleModal from 'simple-modal-vue';

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import daLocale from '@fullcalendar/core/locales/da';

export default {
	name: "Calendar",
	components: {
		FullCalendar,
		CalendarSidebar,
		SimpleModal
	},
	data() {
		return {
			calendarApi: Object,
			showModal: false,
			focusedEvent: {},
			focusedEventSource: {},
		}
	},
	computed: {
		...mapGetters(['events', 'eventSources', 'eventSourceById']),

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
		focusedEventDates() {
			const event = this.focusedEvent
			const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
			const startDate = new Date(event.startStr)
			const endDate = new Date(event.endStr)

			if (event.allDay) return {}

			if (startDate.getDate() !== endDate.getDate()) {
				const start = startDate.toLocaleString('da-DK', options)
				const end = endDate.toLocaleString('da-DK', options)
				return { start, end }
			}

			const start = startDate.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })
			const end = endDate.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })
			return { start, end }
		},
	},
	methods: {
		...mapActions(['setEventSources']),

		handleDateClick: function(arg) {
			this.focusedEvent = arg.event
			this.focusedEventSource = this.eventSourceById(this.focusedEvent.source.id)
			this.showModal = true
			console.log(this.focusedEvent)
		}
	},
	async beforeCreate() {
		this.$store.dispatch('setEventSources')
		this.$store.dispatch('syncCalendars')
	},
	async created() {

	},
	mounted() {
		this.calendarApi = this.$refs.fullCalendar.getApi()
	}
}
</script>

<style lang="scss">
.calendar-container {
	--modal-header-color: #f7f7f7;
	h4 {
		margin-bottom: 0.25em;
	}

	span.focused-event-date {
		display: inline-block;

		&::first-letter {
			text-transform: uppercase;
		}
	}
	.vsm-modal {
		.btn-close {
			color: white;
		}
		.vsm-modal-header {
			background: var(--modal-header-color);

			.title {
				color: white;
			}
		}
	}
}
</style>