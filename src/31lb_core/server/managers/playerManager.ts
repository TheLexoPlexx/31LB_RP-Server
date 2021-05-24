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

const spawnpositions = [
  {"px":-21.05666160583496,"py":-638.7738647460938,"pz":35.28913497924805,"rx":0.001075899344868958,"yx":0.00048563486780039966,"zx":-1.9382637739181519},
  {"px":728.8965454101562,"py":-589.1779174804688,"pz":26.89499855041504,"rx":-0.04029086232185364,"yx":0.027995802462100983,"zx":0.1605008989572525},
  {"px":740.513671875,"py":-835.6133422851562,"pz":24.84783363342285,"rx":0.03764992579817772,"yx":-0.02982323057949543,"zx":-0.4407113492488861},
  {"px":-412.3011779785156,"py":-598.5018920898438,"pz":28.65338134765625,"rx":-0.047998830676078796,"yx":0.0468510203063488,"zx":-0.2965157926082611}
]