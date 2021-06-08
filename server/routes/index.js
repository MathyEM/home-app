var express = require('express');
var router = express.Router();

const controllers = require('../controllers/controllers')

router.get('/', (req, res) => res.send("Hello world!"))

router.get('/calendars', controllers.getCalendars)

router.get('/calendars/sluglist', controllers.getSlugList)

router.get('/calendar/:slug', controllers.getCalendarBySlug)

router.get('/calendar/:slug/events', controllers.getEventsBySlug)

router.get('/calendar/:slug/tasks', controllers.getTasksBySlug)

module.exports = router
