const dav = require('dav')
const caldav = require('../caldav')
const vobject = require('vobject')
const helpers = require('./helpers')

const filterBySlug = helpers.filterBySlug
const filterBySlugRaw = helpers.filterBySlugRaw
const findCalendarObjectById = helpers.findCalendarObjectById
const parseUpdatedTodoObject = helpers.parseUpdatedTodoObject
const syncCalendars = caldav.syncCalendars
const xhr = caldav.xhr

exports.getTodosBySlug = function (req, res) {
    const calendar = filterBySlug(req.params.slug)
    const todos = calendar.todos
    res.json(todos)
}

exports.createTodo = async function (req, res) {
    const calendar = filterBySlugRaw(req.params.slug)
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
    if (reqTodo.categories != '') todo.setProperty(categories)
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
            res.sendStatus(response.status || 500)
        }
        console.log("Success: Todo calendarObject added")
    })
    // After creating and adding calendarObject, re-sync with server to fetch changes
    await syncCalendars()
    res.json(data)
}

exports.updateTodo = async function (req, res) {
    const calendar = filterBySlugRaw(req.params.slug)
    const calendarObject = findCalendarObjectById(calendar, req.params.id)
    const newCalendarData = parseUpdatedTodoObject(req.body, calendarObject.calendarData)

    calendarObject.calendarData = newCalendarData
    console.log("Updating todo calendarObject...")
    try {
        const response = await dav.updateCalendarObject(calendarObject, {
            xhr: xhr
        })
        console.log("Success: Todo calendarObject updated")
        res.json({ success: true })
    } catch (error) {
        console.error("Error updating calendarObject")
        console.log(error)
        res.sendStatus(429)
    }
}

exports.deleteTodo = async function (req, res) {
    const calendar = filterBySlugRaw(req.params.slug)
    const calendarObject = findCalendarObjectById(calendar, req.params.id)

    console.log("Deleting todo calendarObject...")
    try {
        const response = await dav.deleteCalendarObject(calendarObject, {
            xhr: xhr
        })

        console.log("Success: Todo calendarObject deleted")
        res.json({ success: true })
    } catch (error) {
        console.error("Error deleting calendarObject")
        console.log(error)
        res.json({ success: false })
    }
}