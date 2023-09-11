import {TelegrafContext} from "../types";
import {Markup} from "telegraf";
import {GET_APPOINTMENT_TYPE} from "../wizards";


export default async function getAppointmentAction(ctx: TelegrafContext) {
    try {
        Markup.removeKeyboard();
        // Enter to wizard
        return await ctx.scene.enter(GET_APPOINTMENT_TYPE);

    } catch (error) {
        console.log(error)
        console.log('error');
    }
}