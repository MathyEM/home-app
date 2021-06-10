const caldav = require('../caldav')

const calendars = caldav.calendars

exports.filterBySlug = function (slug) {
    return calendars.find(calendar => calendar.href.includes(slug))
}