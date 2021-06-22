const dav = require('dav')
const caldav = require('../custom-modules/caldav')
const Queue = require('../custom-modules/queue.js').Queue
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
    res.json(data)
}

exports.addToUpdateQueue = async function (req, res) {
    const todoId = req.params.id
	const newTodo = req.body
    newTodo.slug = req.params.slug
    newTodo.res = res
	let queue = UPDATE_TODO_QUEUE.find((item) => item.id == todoId)

    // Create a queue for this todo id if one doesn't exist
	if (queue == undefined) {
		const index = UPDATE_TODO_QUEUE.push(new Queue(todoId))-1
		queue = UPDATE_TODO_QUEUE[index]
	}
    // Add the new todo to the queue
	queue.enqueue(newTodo)

	if (queue.running) {
		return //if a queue is already running, stop here
	}
    // Start the queue
    queue.running = true
	while (queue.length() != 0) {
        const todo = queue.peek()
		const response = await updateTodo(todo)
        todo.res.json(response)
        queue.dequeue()
        if (queue.length() == 0) {
            queue.running = false
        }
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

updateTodo = async function (todo) {
    // First get the most updated version of the calendar
    await syncCalendars()

    const calendar = filterBySlugRaw(todo.slug)
    const calendarObject = findCalendarObjectById(calendar, todo.id)
    const newCalendarData = parseUpdatedTodoObject(todo, calendarObject.calendarData)

    // Reaplace the old calendarData with the merged updated one 
    calendarObject.calendarData = newCalendarData
    console.log("Updating todo calendarObject...")
    try {
        const response = await dav.updateCalendarObject(calendarObject, {
            xhr: xhr
        })
        console.log("Success: Todo calendarObject updated")
        return response
    } catch (error) {
        console.error("Error updating calendarObject")
        console.log(error)
        return error
    }
}