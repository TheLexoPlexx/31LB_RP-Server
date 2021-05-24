/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from './../startup';
import { ItemHolder, Item } from "./../../client/interactions/inventory";

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

export function setCloth(player: alt.Player, comp: number, item: ItemHolder, drawable: number, texture: number, dlcHash: string) {
  player.setSyncedMeta("inventory_" + comp, item);
  let palette = 2; //0 oder 1, ka.
  alt.emitClient(player, "a_setclothes", )
  //Noch nicht im release, nur dev: player.setClothes(comp, drawable, texture, palette, alt.hash(dlcHash));
}

export function getInventorySpace(comp: number) {
  
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