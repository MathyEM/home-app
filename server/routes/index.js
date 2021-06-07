var express = require('express');
const vobject = require('vobject');
var router = express.Router();


const caldav = require('../caldav')
const controllers = require('../controllers/controllers')

router.get('/', (req, res) => {
    res.send("Hello world!")
})

router.get('/calendars', (req, res) => {
    res.json(caldav.calendars)
})

router.get('/calendar/:slug', (req, res) => {
    res.json(controllers.getCalendarBySlug(req, res))
})

router.get('/calendar/:slug/events', (req, res) => {
    res.json(controllers.getEventsBySlug(req, res))
})

router.get('/calendar/:slug/tasks', (req, res) => {
    res.json(controllers.getTasksBySlug(req, res))
})

module.exports = router
