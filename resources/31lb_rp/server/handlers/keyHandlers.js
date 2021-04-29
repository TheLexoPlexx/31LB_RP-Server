/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getWeaponByName } from "./../../lib/weapons"

export function keyPressF9(player) {
  alt.log("F9 pressed");

  alt.emitClient(player, "a_weaponselect_s");

  //Sieht nutzlos aus, ist aber wichtig, stehen lassen!
  let pos = player.pos;
  player.pos = pos;
  let rot = player.rot;
  player.rot = rot;

  player.giveWeapon(getWeaponByName("advancedrifle").hash, 20, true);
}