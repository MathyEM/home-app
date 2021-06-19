var express = require('express');
var router = express.Router();
const caldav = require('../caldav')

const calendar = require('../controllers/calendar')
const todolist = require('../controllers/todolist')

router.get('/', (req, res) => res.send("Hello world!"))

router.get('/calendars', calendar.getCalendars)
router.get('/rawcalendars', (req, res) => res.json(CALENDARS))
router.get('/sync', (req, res) => {
    caldav.syncCalendars()
    res.send('calendars synced')
})

router.get('/calendars/sluglist', calendar.getSlugList)

router.get('/calendar/:slug', calendar.getCalendarBySlug)

router.get('/calendar/:slug/events', calendar.getEventsBySlug)

router.get('/calendar/:slug/todos', todolist.getTodosBySlug)

router.post('/calendar/:slug/todos', todolist.createTodo)

module.exports = router
