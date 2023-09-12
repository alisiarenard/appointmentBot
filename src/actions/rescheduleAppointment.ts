import {TelegrafContext} from "../types";
import {Markup} from "telegraf";
import {RESCHEDULE_APPOINTMENT_TYPE} from "../wizards";


export default async function rescheduleAppointmentAction(ctx: TelegrafContext) {
    try {
        Markup.removeKeyboard();
        // Enter to wizard
        return await ctx.scene.enter(RESCHEDULE_APPOINTMENT_TYPE);

    } catch (error) {
        console.log(error)
        console.log('error');
    }
}