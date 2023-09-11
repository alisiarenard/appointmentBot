import { Markup, Composer } from 'telegraf';
import { TelegrafContext } from 'types';

export const TIMES = ['16:00', '17:00', '19:00', 'Вернутся к выбору даты'];

export default async function chooseTime(ctx: TelegrafContext) {
    await ctx.replyWithMarkdown(
        ctx.i18n.t('wizardGetAppointment.actions.time'),
        Markup.inlineKeyboard(TIMES.map((time) => {return [Markup.button.callback(ctx.i18n.t(time), time)]}))
    );
}

export const stepTimeHandler = new Composer<TelegrafContext>();
TIMES.forEach((time) => {stepTimeHandler.action(time, async (ctx) => {
    if (time === 'Вернутся к выбору даты') {
        ctx.scene.reenter();
        return;
    }
    try {
        ctx.session.time = time;
    } catch (error) {
        console.log(error)}
    await ctx.deleteMessage();
    await ctx.replyWithMarkdown(
        ctx.i18n.t('wizardGetAppointment.actions.done', {
            date: ctx.session.date,
            time: ctx.session.time,
        })
    );
    return ctx.scene.leave();
})});
