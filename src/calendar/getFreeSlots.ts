import {google} from "googleapis";
import moment from "moment";

export async function getListEvents(auth: any) {

    const events = await getEvents(auth);
    const freeSlots = await getFree(events);

    return freeSlots;
}

export async function getEvents(auth: any, id?: string) {
    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        timeMax: moment(new Date).add(10, 'days').toISOString(),
        singleEvents: true,
        q: id,
        orderBy: 'startTime',
    });
    return  res.data.items;
}


export async function getFree(e?: any[]) {
    const startTimeEvents: any[] | undefined = e?.map((event) => {
        return {
            date: event.start.dateTime,
            duration: moment(event.end.dateTime).diff(moment(event.start.dateTime), 'minutes')
        };
    });
    const busyDates: string[] = [];
    const allDates: string[] = [];
    const allDays: string[] = [];
    const result: string[] = [];

    // @ts-ignore
    startTimeEvents
        .forEach((date) => date.duration === 60 && busyDates
            .push(date.date, moment(date.date).add(30, 'minutes')
                .format()));

    const date = moment().add(-moment().utcOffset(), 'minutes').toDate();

    for (let dayOffset = 0; dayOffset < 10; dayOffset++) {
        const nextDate = moment(date).add(dayOffset, 'days').format('YYYY-MM-DD');
        allDays.push(nextDate)
    }

    allDays.forEach(date => {
            new Array(11).fill('')
                .forEach((i, index) => {
                    console.log(i);
                    allDates.push(moment(date).set({hour: index + 11}).format());
                    allDates.push(moment(date).set({hour: index + 11, minute: 30}).format());
                });

        });
    const allFreeSlots = allDates
        .flat()
        .filter((i: string) => !busyDates.flat().includes(i)).filter((d: string) => moment(d).isAfter(moment()));

    allFreeSlots.forEach((date: string, i: number) => {
        moment.duration(moment(allFreeSlots[i + 1]).diff(moment(date))).asHours() === 0.5 && result.push(date);
    });
    return result.filter((r) => (moment(r).minutes() !== 30));
}