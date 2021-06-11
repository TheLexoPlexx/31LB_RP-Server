import * as alt from 'alt-client';
import * as native from 'natives';
import { newWebview } from '../util/webviewHelper';
let open = false, disableControlLoop, gpsview;
export function toggleQuickGPS(forceClose) {
    if (forceClose) {
        if (open) {
            closeQuickGPS();
        }
    }
    else {
        if (!open) {
            openQuickGPS();
        }
        else {
            closeQuickGPS();
        }
    }
}
function openQuickGPS() {
    open = true;
    disableControlLoop = alt.everyTick(() => {
        native.disableAllControlActions(alt.Player.local.scriptID);
    });
    alt.showCursor(true);
    gpsview = newWebview("http://resource/client/pages/quickgps.html", true);
}
function closeQuickGPS() {
    open = false;
    alt.clearEveryTick(disableControlLoop);
    gpsview.destroy();
    alt.showCursor(false);
}
