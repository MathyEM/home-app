var express = require('express');
var router = express.Router();
const caldav = require('../caldav')

const calendar = require('../controllers/calendar')
const todolist = require('../controllers/todolist')
const helpers = require('../controllers/helpers');
const { CalendarObject } = require('dav');

router.get('/', (req, res) => res.send("Hello world!"))

router.get('/calendars', calendar.getCalendars)
router.get('calendars/sync', (req, res) => {
    caldav.syncCalendars()
    res.send('calendars synced')
})

router.get('/calendars/sluglist', calendar.getSlugList)

router.get('/calendar/:slug', calendar.getCalendarBySlug)

router.get('/calendar/:slug/events', calendar.getEventsBySlug)

router.get('/calendar/:slug/todos', todolist.getTodosBySlug)

router.post('/calendar/:slug/todos', todolist.createTodo)

router.delete('/calendar/:slug/todo/:id', todolist.deleteTodo)

router.get('/rawcalendars', (req, res) => console.log(CALENDARS_RAW[2]))
router.get('/test', (req, res) => {
    const calendar = helpers.filterBySlugRaw('indkbsliste')
    const calendarObject = helpers.findCalendarObjectById(calendar, '00208dc28fa9482eb5fd9d49af5bc249')

    console.log(calendarObject)
})

module.exports = router
