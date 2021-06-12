/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import { newWebview } from '../util/webviewHelper';

let view;
let discordURL;

export function handleDiscordAuth(url) {
    if (view && view.destroy) {
        view.destroy();
    }

    discordURL = url;
    view = newWebview("http://resource/client/pages/login/l.html?url=" + encodeURIComponent(JSON.stringify(url)), true);
    view.on('a_discordBearerToken', handleBearerToken);
    view.on('a_discordReady', handleReady);
    view.focus();

    alt.showCursor(true);
    alt.toggleGameControls(false);
}

export function handleAuthExit() {
    if (view && view.destroy) {
        view.destroy();
    }

    alt.showCursor(false);
    alt.toggleGameControls(true);
}

export function handleBearerToken(token) {
    alt.emitServer('a_discordBearerToken', token);
}

export function handleReady() {
    if (!view) {
        return;
    }

    view.emit('a_discordReady', discordURL);
}