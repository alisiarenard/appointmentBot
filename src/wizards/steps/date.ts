import { Markup, Composer } from 'telegraf';
import { TelegrafContext } from 'types';
import chooseTime from "./time";

export const DATES = ['26 апреля, Пн', '27 апреля, Вт', '28 апреля, Ср', '29 апреля, Чт', '30 апреля, Пт', '1 мая, Сб', '3 мая, Пн'];

export async function chooseDate(ctx: TelegrafContext) {
    await ctx.replyWithMarkdown(
        ctx.i18n.t('wizardGetAppointment.actions.date'),
        Markup.inlineKeyboard(DATES.map((date) => {return [Markup.button.callback(ctx.i18n.t(date), date)]}))
    );
}

const stepDateHandler = new Composer<TelegrafContext>();
DATES.forEach((date) => { stepDateHandler.action(date, async (ctx) => {
    try {
        ctx.session.date = date;
    } catch (error) {}
    await ctx.deleteMessage();
    await chooseTime(ctx);
    return ctx.wizard.next();
})});

export default stepDateHandler;