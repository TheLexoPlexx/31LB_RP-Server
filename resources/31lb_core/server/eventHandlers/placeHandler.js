import * as alt from 'alt-server';
import { database } from '../startup';
export let unlockableMarkers = [];
export let globalMarkers = [];
export let unlockableColshapes = [];
export let interactionColshapes = [];
export function sortMarkers() {
    alt.log("[31LB] Sorting Markers...");
    database.fetchAllData("places", (result) => {
        if (result == null) {
            result = [];
        }
        result.forEach(element => {
            if (element.unlock_pos == null) {
                globalMarkers.push(element);
            }
            else {
                unlockableMarkers.push(element);
            }
        });
        alt.log("[31LB] Sorted: " + globalMarkers.length + " Globals and " + unlockableMarkers.length + " Unlockables. Creating ColShapes...");
        unlockableMarkers.forEach(element => {
            let pos = JSON.parse(element.unlock_pos);
            let cc = new alt.ColshapeCylinder(pos.x, pos.y, pos.z - 4, element.unlock_radius, 20);
            cc.playersOnly = true;
            element.type = "unlock";
            cc.setMeta("a_placeMeta", element);
            unlockableColshapes.push(cc);
        });
        result.forEach(element => {
            let pos = JSON.parse(element.interact_pos);
            let cc = new alt.ColshapeCylinder(pos.x, pos.y, pos.z - 2, element.interact_radius, 8);
            cc.playersOnly = true;
            element.type = "interaction";
            cc.setMeta("a_placeMeta", element);
            interactionColshapes.push(cc);
        });
    });
    alt.setTimeout(() => {
        alt.on("entityEnterColshape", enteredColshape);
        alt.on("entityLeaveColshape", leaveColshape);
    }, 2000);
    alt.log("[31LB] ColShapes created.");
}
export function clearColshapes() {
    unlockableColshapes.forEach(element => {
        element.destroy();
    });
    interactionColshapes.forEach(element => {
        element.destroy();
    });
}
export function enteredColshape(colshape, player) {
    alt.emitClient(player, "a_enteredColshape", colshape.getMeta("a_placeMeta"));
}
export function leaveColshape(colshape, player) {
    alt.emitClient(player, "a_leaveColshape", colshape.getMeta("a_placeMeta"));
}
export function savePlace(p, new_place) {
    if (p.getSyncedMeta("permissionsgroup") >= 100) {
        database.insertData(new_place, "places", r => {
            alt.log("Neuer Ort gespeichert: " + JSON.stringify(r));
            alt.emitClient(p, "a_newPlaceSaveSuccess", r);
        });
    }
    else {
        alt.emitClient(p, "a_nopermission");
    }
}
export function updatePlacesForPlayer(p, places) {
    p.setSyncedMeta("unlocked_places", places);
}
