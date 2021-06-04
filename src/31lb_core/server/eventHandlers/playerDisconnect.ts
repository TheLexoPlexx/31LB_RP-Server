/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getPlayerByUUID, setValueForPlayer } from '../managers/playerManager';

export function playerActualDisconnect(player: alt.Player) {
  playerDisconnect(player, false);
}

export function playerRestartDisconnect(player: alt.Player) {
  playerDisconnect(player, true);
}

function playerDisconnect(player: alt.Player, restart: boolean) {
  let pos = player.pos;
  let rot = player.rot;
  let id = player.id;
  let hp = player.health;
  let armour = player.armour;
  let uuid = player.getSyncedMeta("uuid");
  let lastvehicle;
  let lastseat;
  if (player.vehicle != null) {
    lastvehicle = player.vehicle.getSyncedMeta("vin");
    lastseat = player.seat;
  } else {
    lastvehicle = null;
    lastseat = null;
  }
  let places = player.getSyncedMeta("unlocked_places");

  getPlayerByUUID(uuid, (result) => {
    if (result != null) {
      result.pos = JSON.stringify(pos);
      result.rot = JSON.stringify(rot);
      result.healthpoints = hp;
      result.armour = armour;
      result.lastvehicle = lastvehicle;
      result.lastseat = lastseat;
      result.unlockedplaces = JSON.stringify(places);

      setValueForPlayer(result, (res_upsert) => {
        alt.log("Player " + res_upsert.name + " left");
        //alt.log("upsert: " + JSON.stringify(res_upsert));
      });
    }
  });
}