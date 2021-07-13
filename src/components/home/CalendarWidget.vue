<template>
	<div class="calendar-widget-container widget">
        <h3>Kalender</h3>
		<div class="calendar-widget-wrapper">
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
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SimpleModal from 'simple-modal-vue';

import FullCalendar from '@fullcalendar/vue'
import listPlugin  from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import daLocale from '@fullcalendar/core/locales/da';

export default {
	name: 'CalendarWidget',
	components: {
		FullCalendar,
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
				plugins: [ listPlugin, interactionPlugin ],
				initialView: 'listMonth',
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
.widget-container .calendar-widget-container.widget {
	overflow: hidden;
	padding-bottom: 2.4rem;
}
.calendar-widget-wrapper {
	height: 100%;

	.fc-header-toolbar.fc-toolbar {
		flex-direction: column;
		gap: 0.25em;
	}
	h2.fc-toolbar-title {
		font-size: 1.4em;
	}
	.fc-toolbar-chunk .fc-button-group {
		margin-left: 0.5em;
	}
	.fc-button {
		//padding: 0.3em;
		font-size: 1em;
	}
}
</style>