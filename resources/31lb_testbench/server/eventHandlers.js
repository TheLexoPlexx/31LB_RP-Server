/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
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
      socialclub: player.socialId,
      password: password,
      money_hand: 400,
      money_bank: 0,
      healthpoints: player.maxHealth,
      armour: player.maxArmour,
      firstjoin: date,
      permissionsgroup: 1,
      sessionid: player.id,
    }
    database.upsertData(new_player, "player", (res) => {
      alt.log("Neuer Spieler: " + JSON.stringify(res));
      player.spawn(-69.551, -855.909, 40.571, 1000);
    });
  } else {
    player.model = 'mp_m_freemode_01'; //TODO: Ändern

    var pos = JSON.parse(result_player.pos);
    var rot = JSON.parse(result_player.rot);
    
    player.spawn(pos.x, pos.y, pos.z, 250);
    alt.setTimeout(() => {
      player.rot = rot;
    }, 500);

    player.health = result_player.healthpoints;
    player.armour = result_player.armour;

    /*
    Herausfinden ob man Player in Fahrzeuge setzen kann

    if (result_player.incar > 0) {
      alt.Vehicle.all.forEach((val, index, array) => {
        if (index.pos.x - result_player.pos.x <= 3) {
          if (index.pos.y - result_player.pos.y <= 3) {
            if (index.pos.z - result_player.pos.z <= 3) {

            }
          }
        }
      });
    }
    */

    //TODO: Zuordnen, blahblah

    result_player.sessionid = player.id;
    database.upsertData(result_player, "player", (res) => {
      alt.log("Player " + res.name + "[" + res.socialclub + "] logged in with SessionID " + res.sessionid);
    });
  }
}

export function playerDisconnect(player) {
  let pos = player.pos;
  let rot = player.rot;
  let id = player.id;
  let hp = player.health;
  let armour = player.armour;
  let incar = player.seat;

  database.fetchData("sessionid", id, "player", (result) => {
    if (result != null) {
      //alt.log(JSON.stringify(result));
      result.pos = JSON.stringify(pos);
      result.rot = JSON.stringify(rot);
      result.healthpoints = hp;
      result.armour = armour;
      result.incar = incar;
      result.sessionid = -1;

      database.upsertData(result, "player", (res_upsert) => {
        alt.log("Player " + res_upsert.name + "[" + res_upsert.socialclub + "] left");
        //alt.log("upsert: " + JSON.stringify(res_upsert));
      });
    }
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