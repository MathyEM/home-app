const caldav = require('../caldav')
const vobject = require('vobject')

const calendars = caldav.calendars

exports.getCalendarBySlug = function (req, res) {
    return calendars.find(calendar => calendar.href.includes(req.params.slug))
}

exports.getEventsBySlug = function (req, res) {
    var events = exports.getCalendarBySlug(req, res).events

    if (!req.query.start) {
        return events
    }

    return getEventsByDate(req.query.start, req.query.end)

    function getEventsByDate(start, end) {
        let queryStart = new Date(start).getTime()
        let queryEnd = new Date(end).getTime()
        const result = events.filter(event => {
            let eventStart = event.props.DTSTART[0].value
            let time = new Date(vobject.dateTimeValue().parseICS(eventStart).toDateTime()).getTime()
            return (queryStart < time &&  time < queryEnd)
        })
        
        return result
    }
}

exports.getTasksBySlug = function (req, res) {
    return exports.getCalendarBySlug(req, res).tasks
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