/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
/**
 * Erzeugt einen Untertitel wie aus Heists am unteren Rand des Bildschirmes
 *
 * @param text Text
 * @param duration Zeit in Millisekunden
 */
export function drawSubtitle(text, duration) {
    native.beginTextCommandPrint('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandPrint(duration, true);
}
/**
 * Erzeugt einen Benachrichtigung links über der Karte
 *
 * @param text Text
 */
export function displayNotification(text) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandThefeedPostTicker(false, true);
}
/**
 * Erzeugt einen bessere Variante Benachrichtigung links über der Karte, die Details hab ich noch nicht raus.
 *
 * @param message Text
 * @param title Titel, default = "Title"
 * @param subtitle Untertitel, default = "subtitle"
 * @param notifImage Bild, default = null
 * @param iconType Icon, default = 0
 * @param backgroundColor Hintergrundfarbe, default = null
 * @param durationMult Zeitmultiplikator, default = 1
 */
export function displayAdvancedNotification(message, title = "Title", subtitle = "subtitle", notifImage = null, iconType = 0, backgroundColor = null, durationMult = 1) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    if (backgroundColor != null)
        native.thefeedSetNextPostBackgroundColor(backgroundColor);
    if (notifImage != null)
        native.endTextCommandThefeedPostMessagetextTu(notifImage, notifImage, false, iconType, title, subtitle, durationMult);
    return native.endTextCommandThefeedPostTicker(false, true);
}
/**
 * Erzeugt ein Rechteck mit gegebener Farbe an gegebener Stellle mit gegebener Größe.
 * Ja, keine Ahnung wofür das gut sein könnte.
 *
 * @param xPos ist ein float 0-1.0
 * @param yPos ist ein float 0-1.0
 * @param width Breite
 * @param height Höhe
 * @param r Rot
 * @param g Grün
 * @param b Blau
 * @param a Alpha, default = 255
 */
export function drawRect(xPos, yPos, width, height, r, g, b, a = 255) {
    const [_, screenWidth, screenHeight] = native.getActiveScreenResolution();
    const w = width / screenWidth;
    const h = height / screenHeight;
    const x = xPos / screenWidth + w * 0.5;
    const y = yPos / screenHeight + h * 0.5;
    drawRect(x, y, w, h, r, g, b, a);
}
/**
 * Ein enum für util.drawTextOnScreen
 */
export const gtafonts = {
    ChaletLondon: 0,
    HouseScript: 1,
    Monospace: 2,
    CharletComprimeColonge: 4,
    Pricedown: 7
};
/**
 * Zeichnet einen Text auf den Bildschirm
 * Source: https://discord.com/channels/371265202378899476/583109900024938527/674522484938244117
 *
 * @param alt Muss weitergegeben werden
 * @param text Textinhalt
 * @param time Zeit, die der Text stehen bleiben soll in Millisekunden
 * @param x ist ein float 0-1.0
 * @param y ist ein float 0-1.0
 * @param scale ist ein float 0-unendlich oder so
 * @param fontType Schriftart, enum gtafonts kann da verwendet werden, default = 7
 *    ChaletLondon: 0, HouseScript: 1, Monospace: 2, CharletComprimeColonge: 4, Pricedown: 7
 * @param r Rot, 0-255, default = 155
 * @param g Grün, 0-255, default = 155
 * @param b Blau, 0-255, default = 155
 * @param a Alpha, 0-255, default = 255
 * @param useOutline Umrandung verwenden, default = true
 * @param useDropShadow Schlagschatten verwenden, default = true
 * @param textjustify Textausrichtung, default = 1, 0: center, 1: links, 2: rechts
 */
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
        //native.setTextCentre(center);
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
//# sourceMappingURL=messenger.js.map