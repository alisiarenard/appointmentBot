import './env';
import {session, Telegraf} from "telegraf";
import i18n from 'i18n';
import {TelegrafContext} from "./types";
import {BOT_TOKEN} from "./config";
import {initActions} from "./actions";
import {initWizards} from "wizards";
import * as process from "process";

const bot = new Telegraf<TelegrafContext>(BOT_TOKEN);

bot.use(session());
bot.use(i18n.middleware());

initWizards(bot);
initActions(bot);

bot.launch();
// Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
    process.on('unhandledRejection', (error) => {
        console.error(error);
        process.exit(1);
    });
    process.on('uncaughtException', (error) => {
        console.log(error);
        process.exit(1);
    });

    console.log('Bot Started');
