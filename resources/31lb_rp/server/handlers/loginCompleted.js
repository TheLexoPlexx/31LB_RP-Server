/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from './../startup';

import * as pm from "./../playerManager";

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
      activeWeapons: JSON.stringify({ a:null, b:null, h:null }),
    }

    pm.setValue(new_player, (res) => {
      alt.log("Neuer Spieler: " + JSON.stringify(res));
      player.spawn(-69.551, -855.909, 40.571);
    });
  } else {
    player.model = 'mp_m_freemode_01'; //TODO: Ändern

    var pos = JSON.parse(result_player.pos);
    var rot = JSON.parse(result_player.rot);
    
    player.spawn(pos.x, pos.y, pos.z);
    player.rot = rot;

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
    pm.setValue(result_player, (res) => {
      alt.log("Player " + res.name + "[" + res.socialclub + "] logged in with SessionID " + res.sessionid);

      alt.emitClient(player, "a_setMeta", "money_hand", res.money_hand)
    });
  }
}

export function login(player, pw) {
  //TODO: Mit Forum koppeln und sinnvoll machen
  database.fetchData("password", pw, "players", (result) => {
    if (result == undefined) {
      loginCompleted(player, null, pw);
    } else {
      if (result.sessionid >= 0) {
        alt.logWarning("Player replaced sessionid " + result.sessionid);
      }
      loginCompleted(player, result, null);
    }
  });
}