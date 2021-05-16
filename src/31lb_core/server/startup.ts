/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import SQL from './util/database';
import * as entities from './entities/entities.js';
import { playerConnect } from './eventHandlers/playerConnect';
import { playerDamage } from './eventHandlers/playerDamage';
import { playerDeath } from './eventHandlers/playerDeath';
import { playerDisconnect } from './eventHandlers/playerDisconnect';
import { keyPressF9, keyPressI, keyPressY } from './eventHandlers/keyHandlers';
import { login } from './eventHandlers/loginCompleted';
import { clearColshapes, generate, savePlace, sortMarkers, updatePlacesForPlayer } from './eventHandlers/placeHandler';
import { openedInventory } from './eventHandlers/inventoryHandler';
import { loadFileJSON, saveFileJSON } from './managers/fileManager';
import { consoleCommandServer } from './consoleCommandServer';

export const dbType = 'postgres';
export const dbHost = 'localhost';
export const dbPort = '5433';
export const dbUsername = '31lb_rpdb';
export const dbPassword = '31lb_rpdb';
export const dbName = '31lb_rpdb';

export var database = new SQL(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, [
  entities.PlayerEntity, entities.WeaponEntity, entities.PlaceEntity
]);

interface InteractFunction<K extends PropertyKey, V> {
  key: K;
  value: V;
}

alt.on('ConnectionComplete', () => {
  alt.log("[31LB] Connected to Database");
});

//TODO: Remove, Debug reasons
alt.on("resourceStart", (errored) => {
  alt.Player.all.forEach((player, index, array) => {
    player.setDateTime(11, 3, 2021, 8, 0, 0);
  });
});

alt.on("consoleCommand", consoleCommandServer)

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

let if_list: InteractFunction<string, CallableFunction>[] = [
  //Beispiel: Key als String aus der Datenbank und vlaue ist eine Funktion
  //{ key: "globalAutobahnFn", value: globalAutobahnFn },
];

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

/* Character Stuff
player.spawn(-763.245, 328.597, 198.486);
player.rot = new alt.Vector3(0, 0, Math.PI);
alt.emit('character:Edit', player);
*/
alt.on('character:Done', (player, data) => {
  alt.emit("character:Sync", player, data);
  player.pos = player.pos;
  console.log(data);
});