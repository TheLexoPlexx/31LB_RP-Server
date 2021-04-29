/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import game from 'natives';
import * as com from "./commands"; //Stehen lassen, wird gebraucht

var dead = false;
var gettingdamage;
var wasted;
var url = "http://resource/client/pages/wasted.html";

//Keine Ahnung wofür das gut ist, ist aus Freeroam-Resource geklaut
game.setPedDefaultComponentVariation(game.playerPedId());

alt.onServer("a_connect", () => {
});

alt.onServer('a_death', () => {
  //TODO: drawText statt HTML, Bildschirm-Shake und Drehung, Audio hinzufügen
  if (gettingdamage != null) {
    alt.clearTimeout(gettingdamage);
  }
  wasted = new alt.WebView(url);
  native.setTimecycleModifier("MP_DEATH_GRADE_BLEND01");
  dead = true;
  wasted.focus();
});

alt.onServer('a_damage', (attacker, damage, weaponHash) => {
  native.setTimecycleModifier("DAMAGE");
  native.setTimecycleModifierStrength(0.6);

  if (gettingdamage != null || dead) {
    alt.clearTimeout(gettingdamage);
  }
  gettingdamage = alt.setTimeout(() => {
    native.setTimecycleModifier("DEFAULT");
    native.setTimecycleModifierStrength(1.5);
  }, 550);
});

alt.onServer('a_alive', () => {
  native.setTimecycleModifier("DEFAULT");
  dead = false;
  if (wasted != null) {
    wasted.destroy();
  }
});

alt.on("keyup", (key) => {
  if (key == 115) { //F4
    alt.emitServer("a_teleport", alt.player);

    //game.requestIpl("apa_v_mp_h_01_b");
  }
});

alt.on("disconnect", () => {
  console.log("[Event]: a_disconnect");
  alt.emitServer("a_disconnect", alt.player);
});

alt.on("character:Done", () => {
  game.requestIpl("apa_v_mp_h_01_b");
});

//TODO native switchOutPlayer on successfull connect






//TODO: Die folgenden Zeilen Code verschieben in externe Datei.

alt.onServer("drawSubtitle", drawSubtitle);
alt.onServer("displayNotification", displayNotification);
alt.onServer("displayAdvancedNotification", displayAdvancedNotification);
alt.onServer("drawRect", drawRect);
alt.onServer("drawText", drawText);

/**
 * Erzeugt einen Untertitel wie aus Heists am unteren Rand des Bildschirmes
 * 
 * @param text Text
 * @param duration Zeit in Millisekunden
 */
 function drawSubtitle(text, duration) {
  native.beginTextCommandPrint('STRING');
  native.addTextComponentSubstringPlayerName(text);
  native.endTextCommandPrint(duration, true);
}

/**
 * Erzeugt einen Benachrichtigung links über der Karte
 * 
 * @param text Text
 */
 function displayNotification(text) {
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
 function displayAdvancedNotification(message, title = "Title", subtitle = "subtitle", notifImage = null, iconType = 0, backgroundColor = null, durationMult = 1) {
  native.beginTextCommandThefeedPost('STRING')
  native.addTextComponentSubstringPlayerName(message)
  if (backgroundColor != null) native.thefeedSetNextPostBackgroundColor(backgroundColor)
  if (notifImage != null) native.endTextCommandThefeedPostMessagetextTu(notifImage, notifImage, false, iconType, title, subtitle, durationMult)
  return native.endTextCommandThefeedPostTicker(false, true)
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
function drawRect(xPos, yPos, width, height, r, g, b, a = 255) {
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

const gtafonts = {
  ChaletLondon: 0,
  HouseScript : 1,
  Monospace: 2,
  CharletComprimeColonge: 4,
  Pricedown: 7
}

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
 * @param center Text an der Mitte ausrichten, default = false
*/
function drawText(text, time, x, y, scale, fontType = 7, r = 155, g = 155, b = 155, a = 255, useOutline = true, useDropShadow = true, center = false) {
  let gameTextInterval = undefined;
  gameTextInterval = alt.everyTick(() => {
    native.setTextFont(fontType);
    native.setTextProportional(false);
    native.setTextScale(scale, scale);
    native.setTextColour(r, g, b, a);
    native.setTextEdge(2, 0, 0, 0, 150);
  
    if(useOutline) { 
      native.setTextOutline();
    }
    if(useDropShadow) {
      native.setTextDropshadow(0, 0, 0, 0, 255);
      native.setTextDropShadow();
    }
  
    native.setTextCentre(center);
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