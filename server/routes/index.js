var express = require('express')
var router = express.Router()
const caldav = require('../custom-modules/caldav')
const vobject = require('vobject')


const calendar = require('../controllers/calendar')
const todolist = require('../controllers/todolist')
const helpers = require('../controllers/helpers')

router.get('/', (req, res) => res.send("Hello world!"))

router.get('/calendars', calendar.getCalendars)
router.get('/calendars/sync', async (req, res) => {
    await caldav.syncCalendars()
    res.send('calendars synced')
})

router.get('/calendars/sluglist', calendar.getSlugList)

router.get('/calendar/:slug', calendar.getCalendarBySlug)

router.get('/calendar/:slug/events', calendar.getEventsBySlug)

router.get('/calendar/:slug/todos', todolist.getTodosBySlug)

router.post('/calendar/:slug/todos', todolist.addToQueue)

router.put('/calendar/:slug/todo/:id', todolist.addToQueue)

router.delete('/calendar/:slug/todo/:id', todolist.addToQueue)

router.get('/rawcalendars', (req, res) => console.log(vobject.parseICS(CALENDARS_RAW[2].objects[0].calendarData).components.VTODO[0].properties))
router.get('/test', (req, res) => {
    res.send('test endpoint')
})

module.exports = router
