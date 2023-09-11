import {google} from "googleapis";
import moment from "moment-timezone";

export async function createNewEvent(auth: any, date: string, name: string) {

    const event = {
    'summary': `GTD - ${name}`,
    description: '',
    'start': {
        'dateTime': date,
        'timeZone': 'Europe/Moscow'
    },
    'end': {
        'dateTime': moment(date).add(1, 'hour').format(),
        'timeZone': 'Europe/Moscow'
    }
}

    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event
    });
    return res.status;
}