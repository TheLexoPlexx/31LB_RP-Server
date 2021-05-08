import * as alt from 'alt-client';
import * as native from 'natives';
export function drawSubtitle(text, duration) {
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}
export function displayNotification(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}
export function displayAdvancedNotification(message, title = "Title", subtitle = "subtitle", notifImage = null, iconType = 0, backgroundColor = null, durationMult = 1) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    if (backgroundColor != null)
        native.thefeedSetNextPostBackgroundColor(backgroundColor);
    if (notifImage != null)
        native.endTextCommandThefeedPostMessagetextTu(notifImage, notifImage, false, iconType, title, subtitle, durationMult);
    return native.endTextCommandThefeedPostTicker(false, true);
}
export function drawRect(xPos, yPos, width, height, r, g, b, a = 255) {
    const [_, screenWidth, screenHeight] = native.getActiveScreenResolution();
    const w = width / screenWidth;
    const h = height / screenHeight;
    const x = xPos / screenWidth + w * 0.5;
    const y = yPos / screenHeight + h * 0.5;
    drawRect(x, y, w, h, r, g, b, a);
}
export const gtafonts = {
    ChaletLondon: 0,
    HouseScript: 1,
    Monospace: 2,
    CharletComprimeColonge: 4,
    Pricedown: 7
};
export function drawText(text, time, x, y, scale, fontType = 7, r = 155, g = 155, b = 155, a = 255, useOutline = true, useDropShadow = true, textjustify = 1, textwrap = { l: 0.0, r: 1.0 }) {
    let gameTextInterval = undefined;
    gameTextInterval = alt.everyTick(() => {
        native.setTextFont(fontType);
        native.setTextProportional(false);
        native.setTextScale(scale, scale);
        native.setTextColour(r, g, b, a);
        native.setTextEdge(2, 0, 0, 0, 150);
        native.setTextJustification(textjustify);
        native.setTextWrap(textwrap.l, textwrap.r);
        if (useOutline) {
            native.setTextOutline();
        }
        if (useDropShadow) {
            native.setTextDropshadow(0, 0, 0, 0, 255);
            native.setTextDropShadow();
        }
        native.beginTextCommandDisplayText("CELL_EMAIL_BCON");
        text.match(/.{1,99}/g).forEach(textBlock => {
            native.addTextComponentSubstringPlayerName(textBlock);
        });
        native.endTextCommandDisplayText(x, y, 0.0);
    });
    alt.setTimeout(() => {
        alt.clearEveryTick(gameTextInterval);
        gameTextInterval = undefined;
    }, time);
}
