/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { PlayerEntity } from '../entities/entities';
import { database } from './startup';

export const deadPlayers = {};
const respawnTime = 10 * 1000;//In millis

export function playerConnect(player) {
  alt.emitClient(player, "a_connect");

  player.spawn(229.9559, -981.7928, -99.66071);
}

export function loginCompleted(player, result_player, password) {
  if (result_player == null) {
    var d = new Date();
    var date = d.getDate().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString();
    var new_player = {
      name: "",
      socialclub: player.socialId,
      mail: "",
      password: password,
      money_hand: 400,
      money_bank: 0,
      healthpoints: player.maxHealth,
      armour: player.maxArmour,
      posX: "0",
      posY: "0",
      posZ: "0",
      rotX: "0",
      rotY: "0",
      rotZ: "0",
      discord: "",
      firstjoin: date,
      permissionsgroup: 1,
      character: "",
      sessionid: player.id
    }
    database.upsertData(new_player, "player", (res) => {
      alt.log("Neuer Spieler: " + JSON.stringify(res));
      player.spawn(-69.551, -855.909, 40.571, 1000);
    });
  } else {
    player.spawn(result_player.posX, result_player.posY, result_player.posZ, 1000);
    player.rot = new alt.Vector3(result_player.rotX, result_player.rotY, result_player.rotZ);

    player.model = 'mp_m_freemode_01';
    //Zuordnen, blahblah

    result_player.sessionid = player.id;
    database.upsertData(result_player, "player", (res) => {
      alt.log("Player " + res.name + " [" + res.socialclub + "] logged in with SessionID " + res.sessionid + " at [" + res.posX + ", " + res.posY + ", " + res.posZ + "]");
    });
  }
}

export function playerDisconnect(player) {
  let pos = player.pos;
  let rot = player.rot;
  let id = player.id;
  database.fetchData("sessionid", id, "player", (result) => {
    //alt.log(JSON.stringify(result));
    result.posX = pos.x;
    result.posY = pos.y;
    result.posZ = pos.z;
    result.rotX = rot.x;
    result.rotY = rot.y;
    result.rotz = rot.z;
    result.sessionid = -1;
    //alt.log(JSON.stringify(result));

    database.upsertData(result, "player", (res_upsert) => {
      alt.log("Player " + res_upsert.name + " [" + res_upsert.socialclub + "] left");
      //alt.log("upsert: " + JSON.stringify(res_upsert));
    });
  });
}

export function playerDeath(player, killer, weaponhash) {
  if (deadPlayers[player.id]) {
    return;
  }

  alt.emitClient(player, "a_death");

  deadPlayers[player.id] = alt.setTimeout(() => {
    if (deadPlayers[player.id]) {
      delete deadPlayers[player.id];
    }
    
    if(!player || !player.valid) {
      return;
    }

    player.spawn(-601.9, -396.3, 69.98, 0);
    alt.emitClient(player, "a_alive");
    player.model = `mp_m_freemode_01`;

  }, respawnTime);
  
  alt.log(player.id + " died.");
}

export function playerDamage(victim, attacker, damage, weaponHash) {
  alt.emitClient(victim, "a_damage", [attacker, damage, weaponHash]);
}