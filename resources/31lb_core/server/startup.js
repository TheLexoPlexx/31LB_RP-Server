import * as alt from 'alt-server';
import SQL from './util/database';
import * as entities from './entities/entities.js';
import { playerConnect } from './handlers/playerConnect';
import { playerDamage } from './handlers/playerDamage';
import { playerDeath } from './handlers/playerDeath';
import { playerDisconnect } from './handlers/playerDisconnect';
import { keyPressF9, keyPressI, keyPressY } from './handlers/keyHandlers';
import { login } from './handlers/loginCompleted';
import { clearColshapes, generate, savePlace, sortMarkers, updatePlacesForPlayer } from './handlers/placeHandler';
import { openedInventory } from './handlers/inventoryHandler';
import { clothSelect } from './handlers/clothHandler';
import { loadFileJSON, saveFileJSON } from './fileManager';
export const dbType = 'postgres';
export const dbHost = 'localhost';
export const dbPort = '5433';
export const dbUsername = '31lb_rpdb';
export const dbPassword = '31lb_rpdb';
export const dbName = '31lb_rpdb';
export var database = new SQL(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, [
    entities.PlayerEntity, entities.WeaponEntity, entities.PlaceEntity
]);
alt.on('ConnectionComplete', () => {
    alt.log("[31LB] Connected to Database");
});
alt.on("resourceStart", (errored) => {
    alt.Player.all.forEach((player, index, array) => {
        player.setDateTime(11, 3, 2021, 8, 0, 0);
    });
});
export let clothesFile = loadFileJSON("pedComponentVariations");
export let whitelistClothesFile = loadFileJSON("pedComponentVariations_whitelist");
alt.on("playerConnect", playerConnect);
alt.on('playerDeath', playerDeath);
alt.on("playerDamage", playerDamage);
alt.on("playerDisconnect", playerDisconnect);
alt.on("resourceStop", clearColshapes);
alt.on("ConnectionComplete", sortMarkers);
alt.onClient("a_keyup_f9", keyPressF9);
alt.onClient("a_keyup_y", keyPressY);
alt.onClient("a_keyup_i", keyPressI);
alt.onClient("a_login", login);
alt.onClient("a_placegen", generate);
alt.onClient("a_saveNewPlace", savePlace);
alt.onClient("a_updatePlacesForPlayer", updatePlacesForPlayer);
alt.onClient("a_openinventory", openedInventory);
alt.onClient("a_clothselect", clothSelect);
alt.onClient("a_saveclothwhitelist", (player, data) => {
    saveFileJSON("pedComponentVariations_whitelist", data);
    whitelistClothesFile = data;
});
let if_list = [];
alt.onClient("event_interact_function", (player, interact_function) => {
    let exec = false;
    if_list.forEach((element) => {
        if (element.key == interact_function) {
            element.value(player);
            exec = true;
            return;
        }
    });
    if (!exec) {
        alt.logWarning("Unregistered function: " + interact_function);
    }
});
alt.on('character:Done', (player, data) => {
    alt.emit("character:Sync", player, data);
    player.pos = player.pos;
    console.log(data);
});
