const caldav = require('../caldav')
const vobject = require('vobject')
const { Calendar } = require('dav')

const calendars = caldav.calendars

exports.getCalendars = function (req, res) {
    res.json(calendars)
}

exports.getSlugList = function (req, res) {
    let slugs = []
    calendars.forEach((calendar) => {
        if (calendar.slug.includes('app-generated')) return // Filter out app-generated calendars
        slugs.push(calendar.slug)
    })
    res.json(slugs)
}

exports.getCalendarBySlug = function (req, res) {
    const calendar = filterBySlug(req)
    res.json(calendar)
}

exports.getEventsBySlug = function (req, res) {
    const calendar = filterBySlug(req)
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

exports.getTasksBySlug = function (req, res) {
    const calendar = filterBySlug(req)
    const tasks = calendar.tasks
    res.json(tasks)
}

exports.createTodo = function (req, res) {
    account.then((account) => {
        //CREATE CALENDAROBJECT
        let calendar = account.calendars[2]
    
        let vCalendar = vobject.calendar()
        let todo = vobject.todo()
        let DTStart = vobject.dateTimeValue(new Date('1994-11-13').toISOString())
        let due = vobject.dateTimeValue(new Date('1995-02-15').toISOString())
        let created =vobject.dateTimeValue(new Date().toISOString())
    
        todo.setDTStart(DTStart)
        todo.setDue(due)
        todo.setCreated(created)
        todo.setSummary('Hello World Summary')
        todo.setDescription('Description Hello World')
        todo.setUID(new Date().getTime() + '@cloud.website.com')
    
        vCalendar.pushComponent(todo)
    
        let data = vCalendar.toICS()
    
        // console.log(calendar);
        // dav.createCalendarObject(calendar, {
        //     filename: 'test.ics',
        //     data: data,
        //     xhr: xhr
        // })
    
    })
}

function filterBySlug(req) {
    return calendars.find(calendar => calendar.href.includes(req.params.slug))
}