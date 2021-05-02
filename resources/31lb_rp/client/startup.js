/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import game from 'natives';
import { playerDamage, playerDeath, revive } from "./handlers/playerDeath";
import { consoleCommand } from './commands';
import { openWeaponShop } from './weaponShop';
import { keyPress } from './keys';

//Keine Ahnung wofür das gut ist, ist aus Freeroam-Resource geklaut
game.setPedDefaultComponentVariation(game.playerPedId());

alt.onServer('a_death', playerDeath);
alt.onServer('a_alive', revive);
alt.onServer('a_damage', playerDamage);
alt.onServer("a_weaponselect_s", openWeaponShop);

alt.on("consoleCommand", consoleCommand)
alt.on("keyup", keyPress);

alt.on("character:Done", () => {
  game.requestIpl("apa_v_mp_h_01_b");
});

//TODO native switchOutPlayer on successfull connect