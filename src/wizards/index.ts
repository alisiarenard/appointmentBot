import { Telegraf, Scenes } from 'telegraf';
import { TelegrafContext } from 'types';
import getAppointmentWizard from './getAppointment';
import { ACTIONS } from './types';
import rescheduleAppointmentWizard from "./rescheduleAppointment";

export { WIZARD_TYPE as GET_APPOINTMENT_TYPE } from './getAppointment';
export { WIZARD_TYPE as RESCHEDULE_APPOINTMENT_TYPE } from './rescheduleAppointment';

export function initWizards(bot: Telegraf<TelegrafContext>) {
    const stage = new Scenes.Stage<TelegrafContext>([getAppointmentWizard, rescheduleAppointmentWizard]);

    stage.action(ACTIONS.CANCEL, (ctx) => {
        ctx.reply(ctx.i18n.t('operationCanceled'));
        return ctx.scene.leave();
    });

    stage.command(ACTIONS.CANCEL, (ctx) => {
        ctx.reply(ctx.i18n.t('operationCanceled'));
        return ctx.scene.leave();
    });

    bot.use(stage.middleware());
}
