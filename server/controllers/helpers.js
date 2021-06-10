const caldav = require('../caldav')

exports.filterBySlug = function (slug) {
    const calendars = caldav.getCalDavCalendars()
    return CALENDARS.find(calendar => calendar.href.includes(slug))
}