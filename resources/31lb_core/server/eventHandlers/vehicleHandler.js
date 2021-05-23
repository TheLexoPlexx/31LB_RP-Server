import * as alt from 'alt-server';
import { database } from '../startup';
export function saveVehicles() {
    alt.Vehicle.all.forEach((vehicle, index, list) => {
        var v = {
            id: vehicle.id,
            model: JSON.stringify(vehicle.model),
            a: vehicle.getAppearanceDataBase64(),
            d: vehicle.getDamageStatusBase64(),
            g: vehicle.getGamestateDataBase64(),
            h: vehicle.getHealthDataBase64(),
            s: vehicle.getScriptDataBase64(),
            pos: JSON.stringify(vehicle.pos),
            rot: JSON.stringify(vehicle.rot),
        };
        alt.log("Saving vehicle... " + v.model + " [" + v.id + "]");
        database.upsertData(v, "vehicles", (result) => {
            alt.log(JSON.stringify(result));
        });
    });
}
export function loadVehicles() {
}
