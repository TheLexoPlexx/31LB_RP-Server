/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from './startup';

export function getPlayer(player, callback) {
  database.fetchData("sessionid", player.id, "player", (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setValue(result, callback) {
  database.upsertData(result, "player", (r) => {
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

}

export function movePlayerWeapon(player, weaponName, toInventory) {

}

export function removePlayerWeapon(player, weaponName) {

}

export function addWeaponComponent(player, weaponName, componentName) {

}

export function moveWeaponComponent(player, weaponName, componentName, toInventory) {
  
}

export function removeWeaponComponent(player, weaponName, componentName) {

}