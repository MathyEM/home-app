const express = require('express')
const cors = require('cors')
require('dotenv').config()
const caldav = require('./caldav')
const routes = require('./routes')

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes)

const port = 3000

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`)
})

// console.log(caldav.calendars);
// caldav.rawData.then((calendars) => console.log(calendars[0]))