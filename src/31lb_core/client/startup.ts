/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { playerDamage, playerDeath, revive } from "./handlers/playerDeath";
import { consoleCommand } from './commands';
import { openWeaponShop } from './interactions/weaponShop';
import { keyDown, keyUp } from './keys';
import { createGlobalBlip, enteredColshape, leaveColshape, saveSuccess, setWaypoint, startPlaceGen } from './interactions/placeGenerator';
import { disableEngineStart, enableEngineStart, setPlayerInVehicle } from './handlers/vehicleHandler';
import { handleDiscordAuth, playerAuthenticated, playerConnect } from './handlers/playerConnect';
import { clothing_inventory_m } from "./shops/inventories/clothing_m";
import { clothing_inventory_f } from "./shops/inventories/clothing_f";

//Keine Ahnung wofür das gut ist, ist aus Freeroam-Resource geklaut
//Ich weiß mittlerweile wofür das gut ist, weiß aber nicht warum es im client steht und traue mich noch nicht es zu entfernen.
native.setPedDefaultComponentVariation(native.playerPedId());

alt.onServer('a_death', playerDeath);
alt.onServer('a_alive', revive);
alt.onServer('a_damage', playerDamage);
alt.onServer("a_weaponselect_s", openWeaponShop);

alt.onServer("a_nopermission", () => { alt.logError("No Permissions.") });

alt.onServer("a_startplacegen", startPlaceGen);
alt.onServer("a_newPlaceSaveSuccess", saveSuccess);
alt.onServer("a_enteredColshape", enteredColshape);
alt.onServer("a_leaveColshape", leaveColshape);
alt.onServer("a_createBlip", createGlobalBlip);
alt.onServer("a_forceEnterVehicle", setPlayerInVehicle);
alt.onServer("a_disableEngineStart", disableEngineStart);
alt.onServer("a_enableEngineStart", enableEngineStart);
alt.onServer("a_setWapoint", setWaypoint);
alt.onServer("a_playerConnect", playerConnect);
alt.onServer('a_discordAuthExit', playerAuthenticated);

alt.onServer("a_discordAuth", handleDiscordAuth);

alt.on("consoleCommand", consoleCommand)
alt.on("keydown", keyDown);
alt.on("keyup", keyUp);

alt.log("Loading clothes...");
if (native.getEntityModel(alt.Player.local.scriptID) == 1885233650) {
  alt.Player.local.setMeta("clothingInventory", clothing_inventory_m);
} else if (native.getEntityModel(alt.Player.local.scriptID) == 2627665880) {
  alt.Player.local.setMeta("clothingInventory", clothing_inventory_f);
} else {
  alt.logError("Wrong Model");
}


//Stub: To be removed:
alt.on("character:Done", () => {
  native.requestIpl("apa_v_mp_h_01_b");
});