/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from '../startup';

export function playerDisconnect(player: alt.Player) {
  let pos = player.pos;
  let rot = player.rot;
  let id = player.id;
  let hp = player.health;
  let armour = player.armour;
  let incar = player.vehicle.id;
  let places = player.getSyncedMeta("unlocked_places");

  database.fetchData("sessionid", id, "players", (result) => {
    if (result != null) {
      result.pos = JSON.stringify(pos);
      result.rot = JSON.stringify(rot);
      result.healthpoints = hp;
      result.armour = armour;
      result.incar = incar;
      result.sessionid = -1;
      result.unlockedplaces = JSON.stringify(places);

      database.upsertData(result, "players", (res_upsert) => {
        alt.log("Player " + res_upsert.name + " left");
        //alt.log("upsert: " + JSON.stringify(res_upsert));
      });
    }
  });
}