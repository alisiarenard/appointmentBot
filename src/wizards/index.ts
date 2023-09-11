import { Telegraf, Scenes } from 'telegraf';
import { TelegrafContext } from 'types';
import getAppointmentWizard from './getAppointment';
import { ACTIONS } from './types';

export { WIZARD_TYPE as GET_APPOINTMENT_TYPE } from './getAppointment';

export function initWizards(bot: Telegraf<TelegrafContext>) {
    const stage = new Scenes.Stage<TelegrafContext>([getAppointmentWizard]);

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
