import {TelegrafContext} from "../types";
import {Markup} from "telegraf";
import {getAppointmentAction} from "./start";

export default async function getPaymentInfoAction(ctx: TelegrafContext) {
    try {
        Markup.removeKeyboard();
        // Enter to wizard
        await ctx.replyWithMarkdown(ctx.i18n.t('wizardGetAppointment.actions.payment'));
        await getAppointmentAction(ctx);

    } catch (error) {
        console.log(error)
        console.log('error');
    }
}