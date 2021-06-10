const caldav = require('../caldav')
const vobject = require('vobject')
const helpers = require('./helpers')

const filterBySlug = helpers.filterBySlug
const calendars = caldav.calendars

exports.getTodosBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    const todos = calendar.todos
    res.json(todos)
}

exports.createTodo = function (req, res) {
    account.then((account) => {
        //CREATE CALENDAROBJECT
        let calendar = account.calendars[2]
    
        let vCalendar = vobject.calendar()
        let todo = vobject.todo()
        // let DTStart = vobject.dateTimeValue(new Date('1994-11-13').toISOString())
        // let due = vobject.dateTimeValue(new Date('1995-02-15').toISOString())
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
