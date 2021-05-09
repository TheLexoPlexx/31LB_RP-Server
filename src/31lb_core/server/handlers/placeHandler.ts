/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from '../startup';
import * as playerManager from "../playerManager";

export function generate(player) {
  playerManager.getPlayer(player, (r) => {
    if (r.permissionsgroup >= 100) {
      alt.emitClient(player, "a_startplacegen");
    } else {
      alt.emitClient(player, "a_nopermission");
    }
  });
} 

export let unlockableMarkers = [];
export let globalMarkers = [];

export let unlockableColshapes = [];
export let interactionColshapes = [];

export function sortMarkers() {
  alt.log("[31LB] Sorting Markers...");
  database.fetchAllData("places", (result) => {
    result.forEach(element => {
      if (element.unlock_pos == null) {
        globalMarkers.push(element);
      } else {
        unlockableMarkers.push(element);
      }
    });
    alt.log("[31LB] Sorted: " + globalMarkers.length + " Globals and " + unlockableMarkers.length + " Unlockables. Creating ColShapes...");

    //Unlocks
    unlockableMarkers.forEach(element => {
      let pos = JSON.parse(element.unlock_pos);
      let cc = new alt.ColshapeCylinder(pos.x, pos.y, pos.z-4, element.unlock_radius, 20);
      cc.playersOnly = true;
      element.type = "unlock";
      cc.setMeta("a_placeMeta", element);
      unlockableColshapes.push(cc);
      //alt.log("[31LB] Unlock colshape created: " + JSON.stringify(cc.pos));
    });

    //Interactions
    result.forEach(element => {
      let pos = JSON.parse(element.interact_pos);
      let cc = new alt.ColshapeCylinder(pos.x, pos.y, pos.z-2, element.interact_radius, 8);
      cc.playersOnly = true;
      element.type = "interaction";
      cc.setMeta("a_placeMeta", element);
      interactionColshapes.push(cc);
      //alt.log("[31LB] Interact colshape created: " + JSON.stringify(cc.pos));
    });
  });

  //FIXME: Called on playerDisconnect?
  alt.setTimeout(() => {
    alt.on("entityEnterColshape", enteredColshape);
    alt.on("entityLeaveColshape", leaveColshape);
  }, 2000);
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
  //alt.log("enteredColshape: " + player.id + " " + JSON.stringify(colshape.getMeta("a_placeMeta").displayname));
  alt.emitClient(player, "a_enteredColshape", colshape.getMeta("a_placeMeta"));
}

export function leaveColshape(colshape, player) {
  //alt.log("leaveColshape: " + player.id + " " + JSON.stringify(colshape.getMeta("a_placeMeta").displayname));
  alt.emitClient(player, "a_leaveColshape", colshape.getMeta("a_placeMeta"));
}

export function savePlace(p, new_place) {
  playerManager.getPlayer(p, (r) => {
    if (r.permissionsgroup >= 100) {
      database.insertData(new_place, "places", r => {
        alt.log("Neuer Ort gespeichert: " + JSON.stringify(r));
        alt.emitClient(p, "a_newPlaceSaveSuccess", r);
      });
    } else {
      alt.emitClient(p, "a_nopermission");
    }
  });
}

export function updatePlacesForPlayer(p, places) {
  database.fetchData("sessionid", p.id, "players", (result) => {
    if (result != null) {
      result.unlockedplaces = JSON.stringify(places);

      database.upsertData(result, "players", (res_upsert) => {
        alt.logWarning("Found new place update complete");
      });
    }
  });
}