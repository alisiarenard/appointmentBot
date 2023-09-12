import {TelegrafContext} from "../types";
import {Markup, Scenes} from "telegraf";
import { getAllEventsByUser, getFreeSlots, rescheduleEvent } from "../calendar";
import moment from "moment-timezone";
import {getAppointmentAction} from "../actions/start";

export const WIZARD_TYPE = 'reschedule-appointment-wizard';

export default new Scenes.WizardScene<TelegrafContext>(
    WIZARD_TYPE,
    async (ctx) => {
        await ctx.deleteMessage();
        const id = ctx.from?.id.toString() ?? '';
        const events = await getAllEventsByUser(id);
        if (events?.length) {
        const formatDates = events?.map((event) => { return {date: moment(event.start?.dateTime), id: event.id}}).map((d) => {
            const date = moment(d.date).tz('Europe/Moscow').locale('ru').format('DD.MM, ddd');
            const time = moment(d.date).tz('Europe/Moscow').format('HH:mm');
            return {formatDate: `🗓 ${date}   🕐 ${time}(МСК)`, eventId: d.id}
        });


            await ctx.replyWithMarkdown(
                ctx.i18n.t('wizardRescheduleAppointment.actions.date'),
                Markup.inlineKeyboard(formatDates.map((date) => {
                    return [Markup.button.callback(ctx.i18n.t(date.formatDate), date.eventId ?? '')]
                }))
            );
            return ctx.wizard.next();
        } else {
            await ctx.replyWithMarkdown(ctx.i18n.t('wizardRescheduleAppointment.actions.noEvents'));
            await getAppointmentAction(ctx);
            return ctx.scene.leave();
        }
    },
    async (ctx) => {
        await ctx.deleteMessage();
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {

            ctx.session.date = ctx.callbackQuery.data;
        }
        const dates = await getFreeSlots();

        if (dates?.length) {
            const formatDates = dates.map((d) => {
                const date = moment(d).tz('Europe/Moscow').locale('ru').format('DD.MM, ddd');
                const time = moment(d).tz('Europe/Moscow').format('HH:mm');
                return {formatDate: `🗓 ${date}   🕐 ${time}(МСК)`, date: moment(d).tz('Europe/Moscow').format()}
            });

            await ctx.replyWithMarkdown(
                ctx.i18n.t('wizardGetAppointment.actions.date'),
                Markup.inlineKeyboard(formatDates.map((date) => {
                    return [Markup.button.callback(ctx.i18n.t(date.formatDate), date.date)]
                }))
            );
            return ctx.wizard.next();
        } else {
            await ctx.replyWithMarkdown(ctx.i18n.t('wizardRescheduleAppointment.actions.noTime'));
            await getAppointmentAction(ctx);
            return ctx.scene.leave();
        }

    },
    async (ctx) => {
        await ctx.deleteMessage();
        const name = `${ctx.from?.first_name} ${ctx.from?.last_name}`;
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
            const result = await rescheduleEvent(ctx.callbackQuery, name, ctx.session.date);

            result === 200 && await ctx.replyWithMarkdown(
                ctx.i18n.t('wizardRescheduleAppointment.actions.done', {
                    date: moment(ctx.callbackQuery?.data).format('DD.MM'),
                    time: moment(ctx.callbackQuery?.data).tz('Europe/Moscow').format('HH.mm'),
                })
            );

            await getAppointmentAction(ctx);

            return ctx.scene.leave();
        }
    }
);