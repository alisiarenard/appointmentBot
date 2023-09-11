import {TelegrafContext} from "../types";
import {Markup, Scenes} from "telegraf";
// import stepNameHandler from './steps/name';
// import stepDateHandler from './steps/date';
// import {stepTimeHandler} from './steps/time';
import {createEvent, getFreeSlots} from "../calendar";
import moment from 'moment-timezone';
import {getAppointmentAction} from "../actions/start";

export const WIZARD_TYPE = 'get-appointment-wizard';

export default new Scenes.WizardScene<TelegrafContext>(
    WIZARD_TYPE,
    async (ctx) => {
        await ctx.deleteMessage();
        const dates = await getFreeSlots();

        if (dates) {
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
            )
        }
        return ctx.wizard.next();
    },
    // stepDateHandler,
    // stepTimeHandler
    async (ctx) => {
        await ctx.deleteMessage();
        const name = `${ctx.from?.first_name} ${ctx.from?.last_name}`;
        if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
        const result = await createEvent(ctx.callbackQuery, name);

            result === 200 && await ctx.replyWithMarkdown(
                ctx.i18n.t('wizardGetAppointment.actions.done', {
                    date: moment(ctx.callbackQuery?.data).format('DD.MM'),
                    time: moment(ctx.callbackQuery?.data).tz('Europe/Moscow').format('HH.mm'),
                })
            );

        await getAppointmentAction(ctx);

        return ctx.scene.leave();
        }
    }
);