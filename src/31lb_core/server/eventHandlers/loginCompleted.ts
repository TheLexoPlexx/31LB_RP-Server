/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import * as pm from "./../managers/playerManager";
import { database } from '../startup';
import { globalMarkers, unlockableMarkers } from './placeHandler';
import tables from '../util/tables';
import * as uuid from "uuid";

//TODO: Change result_player to PlayerEntity
//FIXME: Neue Spieler bekommen keine globalen blips und können keine aufdecken
export function loginCompleted(player: alt.Player, result_player: any, password: String) {
  var playerJSON;
  if (result_player == null) {
    var d = new Date();
    var date = d.getDate().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString();
    var new_player = {
      password: password,
      money_hand: 400,
      money_bank: 0,
      healthpoints: player.maxHealth,
      armour: player.maxArmour,
      firstjoin: date,
      permissions: 1,
      uuid: uuid.v5,
      activeWeapons: JSON.stringify({ a:null, b:null, h:null }),
      unlockedplaces: "[]",
    }

    pm.setValueForPlayer(new_player, (res) => {
      alt.log("Neuer Spieler: " + JSON.stringify(res));
      player.spawn(-69.551, -855.909, 40.571, 0);
    });

    playerJSON = new_player;
  } else {
    player.model = 'mp_m_freemode_01'; //TODO: Ändern

    var pos = JSON.parse(result_player.pos);
    var rot = JSON.parse(result_player.rot);
    
    player.spawn(pos.x, pos.y, pos.z, 0);
    player.rot = rot;

    player.health = result_player.healthpoints;
    player.armour = result_player.armour;

    if (result_player.lastvehicle != null) {
      //TODO: Check if player actually owns vehicle
      alt.emitClient(player, "a_forceEnterVehicle", result_player.lastvehicle, result_player.lastseat)
      alt.log("vehicle " + result_player.lastvehicle);
    }

    pm.setValueForPlayer(result_player, (res) => {
      alt.log("Player " + res.name + " logged in");
    });
    playerJSON = result_player;
  }

  let unlocked_places;
  if (playerJSON.unlockedplaces == "[]" || playerJSON.unlockedplaces == null) {
    unlocked_places = [];
  } else {
    unlocked_places = JSON.parse(result_player.unlockedplaces);
  }

  player.setSyncedMeta("unlocked_places", unlocked_places);

  createBlips(player);

  player.setSyncedMeta("money_hand", playerJSON.money_hand);
  if (playerJSON.faction != null) {
    player.setSyncedMeta("faction", playerJSON.faction);
  }
  player.setSyncedMeta("permissions", playerJSON.permissions);
  player.setSyncedMeta("inventar", playerJSON.inventar);
  player.setSyncedMeta("personalausweis", playerJSON.personalausweis);
  player.setSyncedMeta("allowKeyPress", true);
  player.setSyncedMeta("name", "unbenannt"); //TODO: Fill with Name
  player.setSyncedMeta("uuid", uuid.parse(playerJSON.uuid));
}

export function login(player: alt.Player, pw) {
  //TODO: Mit Forum/Discord koppeln und sinnvoll machen
  database.fetchData("password", pw, tables.players, (result) => {
    if (result == undefined) {
      loginCompleted(player, null, pw);
    } else {
      loginCompleted(player, result, null);
    }
  });
}

export function createBlips(player: alt.Player) {
  let unlocked_places = player.getSyncedMeta("unlocked_places");
  if (unlocked_places != undefined) {
    if (unlocked_places.length > 0) {
      unlocked_places.forEach(element => {
        unlockableMarkers.forEach(allM => {
          if (allM.id == element) {
            alt.emitClient(player, "a_createBlip", allM);
            //element is only id
            //maybe remove element?
          }
        });
      });
    }
  
    //Erstellen der Blips auf der Karte
    globalMarkers.forEach(element => {
      alt.emitClient(player, "a_createBlip", element);
    });
  }
}