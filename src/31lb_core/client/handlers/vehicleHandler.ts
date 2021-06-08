/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { PedConfigFlag } from '../util/pedConfigFlags';

export function setPlayerInVehicle(vin: string, seat: number) {
  let v: alt.Vehicle = null;
  alt.Vehicle.all.forEach(vehicle => {
    if (vehicle.getSyncedMeta("vin") == vin) {
      v = vehicle;
      alt.log("vin found: " + vin);
    }
  });

  if (v != null && v != undefined) {
    alt.log("Spawned: " + JSON.stringify(v.valid));
    alt.log("VIN: " + JSON.stringify(v.getSyncedMeta("vin")));
    alt.log("script: " + JSON.stringify(v.scriptID));
    let cleared = false;
    const interval = alt.everyTick(() => {
      native.setPedIntoVehicle(alt.Player.local.scriptID, v.scriptID, seat-2);
      if (alt.Player.local.vehicle != null) {
        alt.clearInterval(interval);
        cleared = true;
        alt.log("Set Ped into Vehicle");
      }
    });
    alt.setTimeout(() => {
      if (!cleared) {
        alt.clearInterval(interval);
        alt.log("Timed out");
      }
    }, 5000);
  } else {
    alt.logError("No vehicle found for VIN: " + vin);
    alt.logError("VIN: " + JSON.stringify(vin));
  }
}

export function disableEngineStart() {
  native.setPedConfigFlag(alt.Player.local.scriptID, PedConfigFlag.DisableStartingVehEngine, true);
}

export function enableEngineStart() {
  native.setPedConfigFlag(alt.Player.local.scriptID, PedConfigFlag.DisableStartingVehEngine, false);
}