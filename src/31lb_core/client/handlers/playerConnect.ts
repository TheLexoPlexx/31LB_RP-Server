/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { distanceToVehiclePromise } from '../util/numUtils';
import { newWebview } from '../util/webviewHelper';

let view;
let discordURL;
let cam: number;

export function playerConnect() {
  const pos = {
    "px": 607.039794921875,
    "py": -1343.2972412109375,
    "pz": 248.07666015625,
    "rx": 0.07354631274938583,
    "ry": 0.05580117553472519,
    "rz": 2.5798423290252686
  };
  cam = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", pos.px, pos.py, pos.pz, 0, 0, 30, 70, true, 2);
  //native.disableAllControlActions(0);
  native.renderScriptCams(true, true, 20, true, true, cam);
  native.displayRadar(false);
}

export function playerAuthenticated() {
    if (view && view.destroy) {
      view.destroy();
  }

  native.destroyCam(cam, true);
  native.renderScriptCams(false, true, 50, true, true, 0);
  native.freezeEntityPosition(alt.Player.local.scriptID, false);
  native.setFollowPedCamViewMode(1);
  native.displayRadar(true);

  //TODO: native.switchOutPlayer (Chriss)

  alt.showCursor(false);
  alt.toggleGameControls(true);
}

export function checkDistanceToVehicle(vehicle: alt.Vehicle) {
  distanceToVehiclePromise(vehicle, 50).then(() => {
    alt.emitServer("a_despawnFirstVehicle", vehicle);
  })
}

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

export function handleBearerToken(token) {
    alt.emitServer('a_discordBearerToken', token);
}

export function handleReady() {
    if (!view) {
        return;
    }

    view.emit('a_discordReady', discordURL);
}