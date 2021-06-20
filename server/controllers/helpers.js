const caldav = require('../caldav')
const vobject = require('vobject')

exports.filterBySlug = function (slug) {
    return CALENDARS.find(calendar => calendar.href.includes(slug))
}

exports.filterBySlugRaw = function (slug) {
    return CALENDARS_RAW.find(calendar => calendar.data.href.includes(slug))
}

exports.findCalendarObjectById = function (calendar, id) {
    const calendarObject = calendar.objects.find((calendarObject) => {
        return calendarObject.calendarData.includes(`UID:${id}`)
    })
    return calendarObject
}

exports.parseUpdatedTodoObject = function (newTodoObject, oldTodoObject) {
    // //CREATE CALENDAROBJECT
    const oldTodoParsed = vobject.parseICS(oldTodoObject)
    const modifiedDate = vobject.dateTimeValue(new Date().toISOString()).toICS()
    const modified = vobject.dateTimeValue(new Date().toISOString())
    const categories = vobject.property('CATEGORIES', newTodoObject.categories)
    const status = newTodoObject.completed
    const percentComplete = vobject.property('PERCENT-COMPLETE', (status ? '100' : ''))
    const completed = vobject.property('COMPLETED', (status ? modifiedDate : ''))
    const summary = newTodoObject.summary
    const uid = newTodoObject.id

    let vCalendar = vobject.calendar()
    let newTodo = vobject.todo()

    newTodo.setLastModified(modified)
    newTodo.setSummary(summary)
    newTodo.setUID(uid)
    if (newTodoObject.categories != '') newTodo.setProperty(categories)
    if (status) {
        newTodo.setStatus('COMPLETED') // if the todo is completed set its status to completed, else omit
        newTodo.setProperty(percentComplete)
        newTodo.setProperty(completed)
    } else {
        newTodo.setStatus('')
    }
    vCalendar.pushComponent(newTodo)
    
    const newTodoObjectMerged = {...oldTodoParsed, ...vCalendar}
    const data = newTodoObjectMerged.toICS()

    return data
}