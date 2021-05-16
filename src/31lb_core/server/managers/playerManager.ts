/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from './../startup';
import * as entities from "./../entities/entities";

export function getPlayer(player, callback) {
  database.fetchData("sessionid", player.id, "players", (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function getPlayerBySerialId(playerId, callback) {
  database.fetchData("id", playerId, "players", (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setValue(result, callback) {
  database.upsertData(result, "players", (r) => {
    if (callback != null) {
      callback(r);
    }
  });
}

/* === WEAPONS
*/

/**
 * 
 * @param {String} weaponName 
 * @param {Player} player 
 * @param {boolean} inventory 
 */
export function addWeapon(player, weaponName, inventory) {
  getPlayer(player, (result) => {
    var weapons = JSON.parse(result.weapons);

    var found = false;
    weapons.forEach(element => {
      if (element.w == weaponName) {
        element.a += 1;
        found = true;
      }
    });
    if (!found) {
      weapons.push({w: weaponName, i: inventory, c: [], a: 0});
    }

    result.weapons = JSON.stringify(weapons);
    setValue(result, null);
  });
}