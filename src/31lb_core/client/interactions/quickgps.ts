/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let open: boolean = false,
  disableControlLoop: number,
  gpsview: alt.WebView;

export function toggleQuickGPS(forceClose?: boolean) {
  if (forceClose) {
    if (open) {
      closeQuickGPS();
    }
  } else {
    if (!open) {
      openQuickGPS();
    } else {
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
  //Inventar anzeigen
  gpsview = new alt.WebView("http://resource/client/pages/quickgps.html", true);
}

function closeQuickGPS() {
  open = false;

  alt.clearEveryTick(disableControlLoop);

  gpsview.destroy();
  alt.showCursor(false);
}