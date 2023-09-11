import {Telegraf} from "telegraf";
import {GLOBAL_ACTIONS, TelegrafContext} from "../types";
import actionStart from './start';
import getAppointmentAction from "./getAppointment";

export function initActions(bot: Telegraf<TelegrafContext>) {
    bot.start(actionStart);
    bot.settings(async (ctx) => {
        await ctx.setMyCommands([
            {
                command: GLOBAL_ACTIONS.getAppointment,
                description: ctx.i18n.t(`actions.${GLOBAL_ACTIONS.getAppointment}`)
            }
        ]);
    });

    bot.command(GLOBAL_ACTIONS.getAppointment, getAppointmentAction);
    bot.action(GLOBAL_ACTIONS.getAppointment, getAppointmentAction);
}