/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import * as alt from 'alt-client';
import * as native from 'natives';

export function distanceToVehiclePromise(vehicle: alt.Vehicle, range: number = 50, interval: number = 1000): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!vehicle.valid) {
      reject("null");
    }

    let interv = alt.setInterval(() => {
      const distance = alt.Player.local.pos.distanceTo(vehicle.pos);
      if (distance >= range) {
        resolve(true);
        alt.clearInterval(interv);
      }
    }, interval);
  });
}