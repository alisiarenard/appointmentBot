import { Scenes, Context } from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';

interface WizardSession extends Scenes.WizardSessionData {
    username?: string;
    name: string;
    date: string;
    time: string;
}

interface SessionData extends Scenes.WizardSession<WizardSession> {
    username?: string;
    name?: string;
    date: string;
    time: string;
}

export interface TelegrafContext extends Context {
    i18n: TelegrafI18n;
    session: SessionData;
    scene: Scenes.SceneContextScene<TelegrafContext, WizardSession>;
    wizard: Scenes.WizardContextWizard<TelegrafContext>;
}

export enum GLOBAL_ACTIONS {
    getAppointment = 'getAppointment',
}
