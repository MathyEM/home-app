var express = require('express');
var router = express.Router();

const calendar = require('../controllers/calendar')
const todolist = require('../controllers/todolist')

router.get('/', (req, res) => res.send("Hello world!"))

router.get('/calendars', calendar.getCalendars)

router.get('/calendars/sluglist', calendar.getSlugList)

router.get('/calendar/:slug', calendar.getCalendarBySlug)

router.get('/calendar/:slug/events', calendar.getEventsBySlug)

router.get('/calendar/:slug/todos', todolist.getTodosBySlug)

router.post('/calendar/:slug/todos', todolist.createTodo)

module.exports = router
