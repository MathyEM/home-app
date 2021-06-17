const dav = require('dav')
const caldav = require('../caldav')
const vobject = require('vobject')
const helpers = require('./helpers')

const filterBySlug = helpers.filterBySlug

exports.getTodosBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    const todos = calendar.todos
    res.json(todos)
}

exports.createTodo = async function (req, res) {
    const xhr = caldav.xhr
    const account = await caldav.client.createAccount(caldav.accountObject)
    //CREATE CALENDAROBJECT
    const calendar = account.calendars.find(calendar => calendar.data.href.includes(req.params.slug))
    const reqTodo = req.body

    let vCalendar = vobject.calendar()
    let todo = vobject.todo()
    const created = vobject.dateTimeValue(new Date().toISOString())
    const uid = reqTodo.id
    todo.setCreated(created)
    todo.setSummary(reqTodo.summary)
    todo.setUID(uid)
    const categories = vobject.property('CATEGORIES', reqTodo.categories)
    todo.setProperty(categories)

    vCalendar.pushComponent(todo)

    let data = vCalendar.toICS()

    await dav.createCalendarObject(calendar, {
        filename: `${uid}.ics`,
        data: data,
        xhr: xhr
    })
    const newAccount = caldav.client.createAccount(caldav.accountObject)
    await caldav.fetchCalendars(newAccount)
    console.log("todo created")
    res.json(data)
}
