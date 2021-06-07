const dav = require('dav')
const vobject = require('vobject')


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

function parseIcsDate(icsDate) {
    if (!icsDate) {
        return
    }
    var year   = icsDate.substr(0, 4);
    var month  = icsDate.substr(4, 2);
    var day    = icsDate.substr(6, 2);
    
    if (icsDate.search("T")) {
        var hour   = icsDate.substr(9, 2);
        var minute = icsDate.substr(11, 2);
        var second = icsDate.substr(13, 2);
    }
    
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

var calendars = [];
const account = client.createAccount({
    server: 'https://cloud.mem-home.tk/remote.php/dav',
    accountType: 'caldav',
    loadObjects: true,
    filters: [{
        type: 'comp-filter',
        attrs: { name: 'VCALENDAR' },
        // children: [{
        //     type: 'time-rage',
        //     attrs: { name: 'VTODO' },
        // }]
    }]
})

account.then(function(account) {

    account.calendars.forEach(calendar => {
        cal = {}
        cal.href = calendar.data.href
        cal.slug = getCalSlug(cal.href)
        cal.displayName = calendar.displayName

        
        cal.events = []
        cal.tasks = []

        calendar.objects.forEach((object, index) => {
            let calendarData = object.calendarData.split('\n')
            let event = {}
            let task = {}

            if (!getEventData(calendarData, "begin:vtodo")) { //Add VEVENT
                event.etag = object.etag.substr(1, object.etag.length-2) // trim escaped quotes
                let props = vobject.parseICS(object.calendarData).components.VEVENT[0].properties
                event.id = props.UID[0].value
                event.start = props.DTSTART[0].value
                event.end = props.DTEND[0].value
                event.title = props.SUMMARY[0].value
                
                cal.events.push(event)
            } else { // Add VTODO
                task.etag = object.etag.substr(1, object.etag.length-2) // trim escaped quotes
                task.props = vobject.parseICS(object.calendarData).components.VTODO[0].properties
                cal.tasks.push(task)
            }

        });

        calendars.push(cal)
    });
})

const rawData = account.then(function(account) {
    return account.calendars
})

module.exports = { calendars, account, rawData }