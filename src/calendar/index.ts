import path from "path";
import process from "process";
import {google} from "googleapis";
import {authenticate} from "@google-cloud/local-auth";
import {getListEvents} from "./getFreeSlots";
import {createNewEvent} from "./createEvent";

const fs = require('fs').promises;

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');



export async function getFreeSlots() {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    const auth = await authorize(scopes);
    const eventList = await getListEvents(auth);
    return eventList;
}

export async function createEvent(date: any, name: string) {
    const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
    ]
    const auth = await authorize(scopes);
    const creationResponse = await createNewEvent(auth, date.data, name);
    return creationResponse;
}

async function authorize(scopes: string[]) {
    let client: any = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: scopes,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client?.credentials) {
        await saveCredentials(client);
    }
    return client;
}

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}


async function saveCredentials(client: any) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}


