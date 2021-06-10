const dav = require('dav')
const caldav = require('../caldav')
const vobject = require('vobject')
const helpers = require('./helpers')

const filterBySlug = helpers.filterBySlug
const account = caldav.client.createAccount(caldav.accountObject)

exports.getTodosBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    const todos = calendar.todos
    res.json(todos)
}

exports.createTodo = function (req, res) {
    const xhr = caldav.xhr

    account.then((account) => {
        //CREATE CALENDAROBJECT
        let calendar = account.calendars.find(calendar => calendar.data.href.includes(req.params.slug))
        let reqTodo = req.body
    
        let vCalendar = vobject.calendar()
        let todo = vobject.todo()
        let created = vobject.dateTimeValue(new Date().toISOString())
    
        todo.setCreated(created)
        todo.setSummary(reqTodo.summary)
        const uid = new Date().getTime() + '@home.mem-home'
        todo.setUID(uid)
        const categories = vobject.property('CATEGORIES', reqTodo.categories)
        todo.setProperty(categories)
    
        vCalendar.pushComponent(todo)
    
        let data = vCalendar.toICS()
    
        dav.createCalendarObject(calendar, {
            filename: `${uid}.ics`,
            data: data,
            xhr: xhr
        }).then((value) => {
            const account = caldav.client.createAccount(caldav.accountObject)
            caldav.fetchCalendars(account)
        })
        res.json(todo)
    })
}
