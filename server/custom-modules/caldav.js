const dav = require('dav')
const vobject = require('vobject')

// Set up Basic auth for CalDav server
var xhr = new dav.transport.Basic(
    new dav.Credentials({
        username: 'mem',
        password: 's9GKz-R3BZo-jEMHk-wpe7L-kXtfp'
    })
)

var client = new dav.Client(xhr, {
    baseUrl: 'https://cloud.mem-home.tk/remote.php/dav'
})

function getCalSlug(href) {
    var matches = href.match(/\/([^/]+)\//g)
    var match = matches[matches.length-1]

    return match.substr(1, match.length-2)
}

function getEventData(calendarData, dataField) {
    var str = calendarData.find(element => element.toLowerCase().includes(dataField.toLowerCase()))
    if (!str) {
        return
    }
    var n = str.indexOf(":")
    str = str.substr(n+1, str.length-n) //remove data key
    str = str.replace(/\\/g,"") // remove double-backslashes
    return str.trim()
}

// Request used to fetch vCalendars
const accountObject = {
    server: 'https://cloud.mem-home.tk/remote.php/dav',
    accountType: 'caldav',
    loadObjects: true,
    filters: [{
        type: 'comp-filter',
        attrs: { name: 'VCALENDAR' }
    }]
}

global.UPDATE_TODO_QUEUE = []
global.ACCOUNT = client.createAccount(accountObject)

parseCalendars(ACCOUNT)

async function parseCalendars(account) {
    const acc = await account
    global.CALENDARS_RAW = acc.calendars
    let calendars = []
    
    CALENDARS_RAW.forEach(calendar => {
        cal = {}
        cal.events = []
        cal.todos = []

        cal.href = calendar.data.href
        cal.slug = getCalSlug(cal.href)
        cal.displayName = calendar.displayName

        calendar.objects.forEach((object, index) => {
            let calendarData = object.calendarData.split('\n')
            let event = {}
            let todo = {}

            if (!getEventData(calendarData, "begin:vtodo")) { //Add VEVENT
                event.etag = object.etag.substr(1, object.etag.length-2) // trim escaped quotes
                const props = vobject.parseICS(object.calendarData).components.VEVENT[0].properties
                event.id = props.UID[0].value
                event.start = props.DTSTART[0].value
                event.end = props.DTEND[0].value
                event.title = props.SUMMARY[0].value
                event.rawData = object.calendarData
                
                cal.events.push(event)
            } else { // Add VTODO
                todo.etag = object.etag.substr(1, object.etag.length-2) // trim escaped quotes
                const props = vobject.parseICS(object.calendarData).components.VTODO[0].properties
                todo.id = props.UID[0].value
                todo.summary = props.SUMMARY[0].value
                todo.categories = props.CATEGORIES != null ? props.CATEGORIES[0].value : ""
                todo.completed = props.STATUS != null ? (props.STATUS[0].value == "COMPLETED" ? true : false) : false
                todo.rawData = object.calendarData

                cal.todos.push(todo)
            }
        });

        calendars.push(cal)
    });
    global.CALENDARS = calendars
    console.log("Calendars fetched");
}

async function syncCalendars() {
    console.log("Calendar sync started")
    ACCOUNT = await client.createAccount(accountObject)
    await parseCalendars(ACCOUNT)
    console.log("Calendar synced completed")
}

module.exports = { 
    client,
    accountObject,
    xhr,
    parseCalendars,
    syncCalendars,
}
