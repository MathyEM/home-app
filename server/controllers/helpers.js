const { CalendarObject } = require('dav')
const caldav = require('../caldav')

exports.filterBySlug = function (slug) {
    return CALENDARS.find(calendar => calendar.href.includes(slug))
}

exports.filterBySlugRaw = function (slug) {
    return CALENDARS_RAW.find(calendar => calendar.data.href.includes(slug))
}

exports.findCalendarObjectById = function (calendar, id) {
    const calendarObject = calendar.objects.find((calendarObject) => {
        return calendarObject.calendarData.includes(`UID:${id}`)
    })
    return calendarObject
}