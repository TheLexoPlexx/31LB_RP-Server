/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from '../startup';
import tables from '../database/tables';
import { getVehicleByVin, updateVehicle } from '../managers/vehicleManager';

export let unlockableMarkers = [];
export let globalMarkers = [];

export let unlockableColshapes = [];
export let interactionColshapes = [];

export function sortMarkers() {
  alt.log("[31LB] Sorting Markers...");
  database.fetchAllData(tables.places, (result) => {
    if (result == null) {
      result = [];
    }
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

export function enteredColshape(colshape: alt.Colshape, ent: alt.Entity) {
  //alt.log("enteredColshape: " + player.id + " " + JSON.stringify(colshape.getMeta("a_placeMeta").displayname));
  if (ent instanceof alt.Player) {
    alt.emitClient(ent, "a_enteredColshape", colshape.getMeta("a_placeMeta"));
  }
}

export function leaveColshape(colshape: alt.Colshape, ent: alt.Entity) {
  //alt.log("leaveColshape: " + player.id + " " + JSON.stringify(colshape.getMeta("a_placeMeta").displayname));
  if (ent instanceof alt.Player) {
    alt.emitClient(ent, "a_leaveColshape", colshape.getMeta("a_placeMeta"));

    if (colshape.getMeta("despawnVehicle") != null) {
      let dv = alt.Vehicle.all.filter(vehicle => vehicle.getSyncedMeta("vin") == colshape.getMeta("despawnVehicle"))[0];
      getVehicleByVin(colshape.getMeta("despawnVehicle"), (result) => {
        result.spawned = false;
        updateVehicle(result);
        dv.destroy();
        alt.emitClient(ent, "a_enableEngineStart");
      });
      colshape.destroy();
    }
  }
}

export function savePlace(p: alt.Player, new_place) {
  if (p.getSyncedMeta("permissions") >= 100) {
    database.insertData(new_place, tables.places, r => {
      alt.log("Neuer Ort gespeichert: " + JSON.stringify(r));
      alt.emitClient(p, "a_newPlaceSaveSuccess", r);
    });
  } else {
    alt.emitClient(p, "a_nopermission");
  }
}

export function updatePlacesForPlayer(p: alt.Player, places) {
  p.setSyncedMeta("unlocked_places", places);
}