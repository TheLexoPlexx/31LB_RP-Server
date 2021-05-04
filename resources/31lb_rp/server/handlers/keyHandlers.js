/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getWeaponByName } from "./../../lib/weapons";
import * as playerManager from "./../playerManager";
import * as wm from "./../weaponManager";

var menuopen = false;

export function keyPressF9(player) {
  alt.log("F9 pressed");

  wm.changeWeaponOwner("ZQVX294001", 20);
  
  if (!menuopen) {
    alt.emitClient(player, "a_weaponselect_s");

    //Sieht nutzlos aus, ist aber wichtig, stehen lassen!
    let pos = player.pos;
    player.pos = pos;
    let rot = player.rot;
    player.rot = new alt.Vector3(0, 90, player.rot.z);

    /*

    playerManager.addWeapon(player, "advancedrifle", true);
    playerManager.addWeaponComponent(player, "advancedrifle", "extendedclip");

    player.giveWeapon(getWeaponByName("advancedrifle").hash, 20, true);
    player.giveWeapon(getWeaponByName("revolvermk2").hash, 40, true);
    */

    menuopen = true;
  } else {

    //TODO: Close Menu
    
    menuopen = true;
  }
}

export function keyPressY(player) {
  //placeholder, only used on client so far
} 