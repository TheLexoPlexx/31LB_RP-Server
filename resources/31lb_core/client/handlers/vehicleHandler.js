import * as alt from 'alt-client';
import * as native from 'natives';
export function setPlayerInVehicle(vin, seat) {
    let v;
    alt.Vehicle.all.forEach(vehicle => {
        if (vehicle.getSyncedMeta("vin") == vin) {
            v = vehicle;
            alt.log("vin found: " + vin);
        }
    });
    let cleared = false;
    const interval = alt.everyTick(() => {
        alt.log(seat);
        native.setPedIntoVehicle(alt.Player.local.scriptID, v.scriptID, seat - 2);
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
}
