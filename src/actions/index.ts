import {Telegraf} from "telegraf";
import {GLOBAL_ACTIONS, TelegrafContext} from "../types";
import actionStart from './start';
import getAppointmentAction from "./getAppointment";
import rescheduleAppointmentAction from "./rescheduleAppointment";
import getPaymentInfoAction from "./getPaymentInfo";

export function initActions(bot: Telegraf<TelegrafContext>) {
    bot.start(actionStart);
    bot.settings(async (ctx) => {
        await ctx.setMyCommands([
            {
                command: GLOBAL_ACTIONS.getAppointment,
                description: ctx.i18n.t(`actions.${GLOBAL_ACTIONS.getAppointment}`)
            },
            {
                command: GLOBAL_ACTIONS.rescheduleAppointment,
                description: ctx.i18n.t(`actions.${GLOBAL_ACTIONS.rescheduleAppointment}`)
            }
        ]);
    });

    bot.command(GLOBAL_ACTIONS.getAppointment, getAppointmentAction);
    bot.action(GLOBAL_ACTIONS.getAppointment, getAppointmentAction);
    bot.command(GLOBAL_ACTIONS.rescheduleAppointment, rescheduleAppointmentAction);
    bot.action(GLOBAL_ACTIONS.rescheduleAppointment, rescheduleAppointmentAction);
    bot.command(GLOBAL_ACTIONS.paymentInfo, getPaymentInfoAction);
    bot.action(GLOBAL_ACTIONS.paymentInfo, getPaymentInfoAction);
}