/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getWeaponByName } from "./../../lib/weapons"

var menuopen = false;

export function keyPressF9(player) {
  alt.log("F9 pressed");

  if (!menuopen) {
    alt.emitClient(player, "a_weaponselect_s");

    //Sieht nutzlos aus, ist aber wichtig, stehen lassen!
    let pos = player.pos;
    player.pos = pos;
    let rot = player.rot;
    player.rot = new alt.Vector3(0, 90, player.rot.z);

    player.giveWeapon(getWeaponByName("advancedrifle").hash, 20, true);
    player.giveWeapon(getWeaponByName("revolvermk2").hash, 40, true);

    menuopen = true;
  } else {

    //TODO: Close Menu
    
    menuopen = true;
  }
}

export function keyPressY(player) {
  //placeholder, only used on client so far
} 