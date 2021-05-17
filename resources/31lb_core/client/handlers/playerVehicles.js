import * as alt from 'alt-client';
import * as natives from 'natives';
export function setPlayerInVehicle(player, vehicle, seat) {
    let cleared = false;
    const interval = alt.setInterval(() => {
        const vehicleScriptId = vehicle.scriptID;
        alt.log(vehicleScriptId);
        if (vehicleScriptId) {
            natives.setPedIntoVehicle(alt.Player.local.scriptID, vehicleScriptId, seat);
            alt.clearInterval(interval);
            cleared = true;
        }
    }, 10);
    alt.setTimeout(() => {
        if (!cleared) {
            alt.clearInterval(interval);
        }
    }, 5000);
}
