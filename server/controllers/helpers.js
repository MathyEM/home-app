const caldav = require('../caldav')

const calendars = caldav.calendars

exports.filterBySlug = function (req) {
    return calendars.find(calendar => calendar.href.includes(req.params.slug))
}