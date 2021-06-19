const dav = require('dav')
const caldav = require('../caldav')
const vobject = require('vobject')
const filterBySlug = require('./helpers').filterBySlug

exports.getTodosBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    const todos = calendar.todos
    res.json(todos)
}

exports.createTodo = async function (req, res) {
    const xhr = caldav.xhr
    const calendar = CALENDARS_RAW.find(calendar => calendar.data.href.includes(req.params.slug))
    const reqTodo = req.body
    
    //CREATE CALENDAROBJECT
    let vCalendar = vobject.calendar()
    let todo = vobject.todo()

    const created = vobject.dateTimeValue(new Date().toISOString())
    const uid = reqTodo.id
    const categories = vobject.property('CATEGORIES', reqTodo.categories)
    todo.setCreated(created)
    todo.setSummary(reqTodo.summary)
    todo.setUID(uid)
    todo.setProperty(categories)

    vCalendar.pushComponent(todo)

    const data = vCalendar.toICS()

    console.log("Adding todo calendarObject...");
    await dav.createCalendarObject(calendar, {
        filename: `${uid}.ics`,
        data: data,
        xhr: xhr
    }).then(response => {
        if (response.status != 201) {
            console.error("Error creating calendarObject")
            console.log(response)
            res.json(response)
        }
    })

    // After creating and adding calendarObject, re-sync with server to fetch changes
    await caldav.syncCalendars()
    console.log("Todo calendarObject added")
    res.json(data)
}
