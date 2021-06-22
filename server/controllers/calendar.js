const caldav = require('../custom-modules/caldav')
const vobject = require('vobject')
const helpers = require('./helpers')

const filterBySlug = helpers.filterBySlug

exports.getCalendars = function (req, res) {
    const calendarsData = []

    CALENDARS.forEach(calendar => {
        if (calendar.slug.includes('app-generated')) return // Filter out app-generated calendars
        cal = {
            displayName: calendar.displayName,
            id: calendar.slug,
            hasEvents: calendar.events.length > 0 ? true : false,
            hasTodos: calendar.todos.length > 0 ? true : false
        }
        calendarsData.push(cal)
    })

    res.json(calendarsData)
}

exports.getSlugList = function (req, res) {
    let slugs = []
    CALENDARS.forEach((calendar) => {
        if (calendar.slug.includes('app-generated')) return // Filter out app-generated calendars
        slugs.push(calendar.slug)
    })
    res.json(slugs)
}

exports.getCalendarBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    res.json(calendar)
}

exports.getEventsBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    var events = calendar.events

    if (req.query.start) { // if start date query parameter is set
        res.json(getEventsByDate(req.query.start, req.query.end))
        return
    }
    res.json(events)

    function getEventsByDate(start, end) {
        let queryStart = new Date(start).getTime()
        let queryEnd = new Date(end).getTime()
        const result = events.filter(event => {
            let eventStart = event.start
            let time = new Date(vobject.dateTimeValue().parseICS(eventStart).toDateTime()).getTime()
            return (queryStart < time &&  time < queryEnd)
        })
        return result
    }
}

