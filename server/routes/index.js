var express = require('express')
var router = express.Router()
const caldav = require('../caldav')
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

router.post('/calendar/:slug/todos', todolist.createTodo)

router.put('/calendar/:slug/todo/:id', todolist.updateTodo)

router.delete('/calendar/:slug/todo/:id', todolist.deleteTodo)

router.get('/rawcalendars', (req, res) => console.log(CALENDARS_RAW[2].objects))
router.get('/test', (req, res) => {
    res.send('test endpoint')
})

module.exports = router
