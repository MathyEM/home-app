const express = require('express')
const cors = require('cors')
require('dotenv').config()
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const caldav = require('./caldav')
const routes = require('./routes')

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes)

const port = 3000

// const uri = process.env.DB_SERVER;
// const db_user = process.env.DB_USER;
// const db_pass = process.env.DB_PASS;
// mongoose.connect(uri, {
// 	user: db_user,
// 	pass: db_pass,
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// })
// .then(() => {
// 	console.log('MongoDB Connected')
// })
// .catch(err => console.log(err))


app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`)
})

// console.log(caldav.calendars);
// caldav.rawData.then((calendars) => console.log(calendars[0]))