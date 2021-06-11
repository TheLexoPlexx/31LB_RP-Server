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
    view.on('discord:BearerToken', handleBearerToken);
    view.on('discord:Ready', handleReady);
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
    alt.emitServer('discord:BearerToken', token);
}
export function handleReady() {
    if (!view) {
        return;
    }
    view.emit('discord:Ready', discordURL);
}
