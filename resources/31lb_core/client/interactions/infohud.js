import * as alt from 'alt-client';
import * as native from 'natives';
var opened = false;
var timeout;
var timer = undefined;
var timeToDisplay = 3500;
export function toggleInfoHud() {
    if (opened) {
        opened = false;
        alt.clearTimeout(timeout);
        alt.clearEveryTick(timer);
        native.setBigmapActive(false, false);
    }
    else {
        opened = true;
        timer = alt.everyTick(() => {
            native.setBigmapActive(true, false);
            native.setTextFont(7);
            native.setTextProportional(false);
            native.setTextScale(0.65, 0.65);
            native.setTextColour(114, 204, 114, 255);
            native.setTextEdge(2, 0, 0, 0, 150);
            native.setTextJustification(2);
            native.setTextWrap(0.5, 0.975);
            native.setTextOutline();
            native.beginTextCommandDisplayText("CELL_EMAIL_BCON");
            native.addTextComponentSubstringPlayerName("$" + alt.getSyncedMeta("money_hand"));
            native.endTextCommandDisplayText(0.8, 0.015, 0.0);
        });
        timeout = alt.setTimeout(() => {
            alt.clearEveryTick(timer);
            native.setBigmapActive(false, false);
            timer = undefined;
            opened = false;
        }, timeToDisplay);
    }
}
