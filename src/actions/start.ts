import {GLOBAL_ACTIONS, TelegrafContext} from "../types";
import {Markup} from "telegraf";

export default async function startAction(ctx: TelegrafContext) {
    const message = ctx.i18n.t('greeting', {
        name: ctx.from?.first_name || ctx.from?.username,
    });

    await ctx.replyWithMarkdown(message);
    await getAppointmentAction(ctx);
}

export function getAppointmentAction(ctx: TelegrafContext) {
    return ctx.replyWithMarkdown(
        'Для выбора даты и времени встречи нажми кнопку Записаться',
        Markup.inlineKeyboard(
            [
                Markup.button.callback(ctx.i18n.t('wizardGetAppointment.menu.getAppointment'), GLOBAL_ACTIONS.getAppointment)
            ]
        )
    );
}