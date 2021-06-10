const caldav = require('../caldav')

exports.filterBySlug = function (slug) {
    return CALENDARS.find(calendar => calendar.href.includes(slug))
}