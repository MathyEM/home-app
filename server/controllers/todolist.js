const dav = require('dav')
const caldav = require('../caldav')
const vobject = require('vobject')
const filterBySlug = require('./helpers').filterBySlug

const syncCalendars = caldav.syncCalendars
const xhr = caldav.xhr

exports.getTodosBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    const todos = calendar.todos
    res.json(todos)
}

exports.createTodo = async function (req, res) {
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
            res.status(response.status || 500)
        }
        console.log("Todo calendarObject added")
    })
    // After creating and adding calendarObject, re-sync with server to fetch changes
    await syncCalendars()
    res.json(data)
}

exports.deleteTodo = async function (req, res) {
    const reqTodo = req.body
    const object = reqTodo.rawData

    console.log("Deleting todo calendarObject...")
    await dav.deleteCalendarObject(object, { xhr: xhr })
    console.log("Todo calendarObject deleted")
    await syncCalendars()
}