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

exports.addToQueue = async function (req, res) {
    const newTodo = req.body
    const todoId = req.params.id
    newTodo.slug = req.params.slug
    newTodo.method = req.method
    newTodo.res = res
    if (newTodo.id == undefined) newTodo.id = todoId

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
    runQueue(queue)
}

createTodo = async function (todo) {
    const slug = todo.slug
    const calendar = filterBySlugRaw(slug)
    
    //CREATE CALENDAROBJECT
    let vCalendar = vobject.calendar()
    let todoObject = vobject.todo()

    const created = vobject.dateTimeValue(new Date().toISOString())
    const uid = todo.id
    const categories = vobject.property('CATEGORIES', todo.categories)
    todoObject.setCreated(created)
    todoObject.setSummary(todo.summary)
    todoObject.setUID(uid)
    if (todo.categories != '') todoObject.setProperty(categories)
    vCalendar.pushComponent(todoObject)
    const data = vCalendar.toICS()

    
    console.log("Adding todo calendarObject...")
    try {
        const response = await dav.createCalendarObject(calendar, {
            filename: `${uid}.ics`,
            data: data,
            xhr: xhr
        })
        console.log("Success: Todo calendarObject added")
        return data
    } catch (error) {
        console.error("Error adding todo calendarObject")
        console.log(error)
        return error
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

deleteTodo = async function (todo) {
    // First get the most updated version of the calendar
    await syncCalendars()

    const calendar = filterBySlugRaw(todo.slug)
    const calendarObject = findCalendarObjectById(calendar, todo.id)

    console.log("Deleting todo calendarObject...")
    try {
        const response = await dav.deleteCalendarObject(calendarObject, {
            xhr: xhr
        })
        console.log("Success: Todo calendarObject deleted")
        return response
    } catch (error) {
        console.error("Error deleting calendarObject")
        console.log(error)
        return error
    }
}

runQueue = async function (queue) {
    queue.running = true
    while (queue.length() != 0) {
        const todo = queue.peek()
        console.log("pre- queue is: ", queue.length())
        if (todo.method == "POST") {
            const response = await createTodo(todo)
            todo.res.json(response)
        } else if (todo.method == "PUT") {
            const response = await updateTodo(todo)
            todo.res.json(response)
        } else if (todo.method == "DELETE") {
            const response = await deleteTodo(todo)
            todo.res.json(response)
        } else {
            todo.res.sendStatus(405)
        }
        queue.dequeue()
        console.log("post- queue is: ", queue.length())
        if (queue.length() == 0) {
            console.log("queue ended")
            queue.running = false
        }
    }
}