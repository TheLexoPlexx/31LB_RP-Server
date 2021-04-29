/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getWeaponByName } from '../client/lib/weapons';

//Debug reasons, TODO: Remove
alt.on("resourceStart", (errored) => {
  alt.Player.all.forEach((player, index, array) => {
    player.setDateTime(parseInt("11"), parseInt("03"), parseInt("2021"), parseInt("8"), parseInt("0"), parseInt("0"));
  });
});


alt.onClient("a_f9_pressed", (player) => {
  alt.log("F9 pressed");

  alt.emitClient(player, "a_weaponselect_s");

  //Sieht nutzlos aus, ist aber wichtig, stehen lassen!
  let pos = player.pos;
  player.pos = pos;
  let rot = player.rot;
  player.rot = rot;

  player.giveWeapon(getWeaponByName("advancedrifle").hash, 20, true);
});