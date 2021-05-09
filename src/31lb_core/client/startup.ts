/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as natives from 'natives';
import { playerDamage, playerDeath, revive } from "./handlers/playerDeath";
import { consoleCommand } from './commands';
import { openWeaponShop } from './weaponShop';
import { keyPress } from './keys';
import { setMetaPlayer } from './handlers/meta';
import { createGlobalBlip, enteredColshape, leaveColshape, saveSuccess, startPlaceGen } from './placeGenerator';

//Keine Ahnung wofür das gut ist, ist aus Freeroam-Resource geklaut
natives.setPedDefaultComponentVariation(natives.playerPedId());

alt.onServer('a_death', playerDeath);
alt.onServer('a_alive', revive);
alt.onServer('a_damage', playerDamage);
alt.onServer("a_weaponselect_s", openWeaponShop);

alt.onServer("a_nopermission", () => { alt.logError("No Permissions.") });

alt.onServer("a_setMeta", setMetaPlayer);
alt.onServer("a_startplacegen", startPlaceGen);
alt.onServer("a_newPlaceSaveSuccess", saveSuccess);
alt.onServer("a_enteredColshape", enteredColshape);
alt.onServer("a_leaveColshape", leaveColshape);
alt.onServer("a_createBlip", createGlobalBlip);

alt.on("consoleCommand", consoleCommand)
alt.on("keyup", keyPress);

alt.on("character:Done", () => {
  natives.requestIpl("apa_v_mp_h_01_b");
});

//TODO native switchOutPlayer on successfull connect