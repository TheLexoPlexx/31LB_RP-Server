/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import SQL from './database/database';
import * as entities from './database/entities';
import { createBlips, playerConnect } from './eventHandlers/playerConnect';
import { playerDamage } from './eventHandlers/playerDamage';
import { playerDeath } from './eventHandlers/playerDeath';
import { playerActualDisconnect, playerRestartDisconnect } from './eventHandlers/playerDisconnect';
import { keyPressF9, keyPressI, keyPressM, keyPressY } from './eventHandlers/keyHandlers';
import { enteredColshape, leaveColshape, savePlace, sortMarkers, updatePlacesForPlayer } from './eventHandlers/placeHandler';
import { openedInventory } from './eventHandlers/inventoryHandler';
import { teamLogin, teamLogoff } from './eventHandlers/teamLoginHandler';
import { colshapeMeta } from '../client/interactions/placeGenerator';
import { loadVehicles } from './managers/vehicleManager';
import { initWeather } from './eventHandlers/weather';
import { List } from './util/util';
import { toggleKeypress } from './managers/playerManager';
import { consoleCommand, safeStopped } from './serverCommands';

//--------------------------------------------------------------------------------------//
//                                 Connect to Database                                  //
//--------------------------------------------------------------------------------------//
const db = {
  host: "localhost",
  port: "5433",
  username: "31lb_rpdb",
  password: "31lb_rpdb",
  name: "31lb_rpdb"
}

export var database = new SQL("postgres", db.host, db.port, db.username, db.password, db.name, [
  entities.PlayerEntity, entities.WeaponEntity, entities.PlaceEntity, entities.VehicleEntity
]);

//--------------------------------------------------------------------------------------//
//                              Discord Authenticator Init                              //
//--------------------------------------------------------------------------------------//
export const discord = {
  client_id: "467682657887846411",
  client_secret: "Q-lCGXEAJx5WHgveCpK-lA3rFyK0y9Yt",
  bot_token: "NDY3NjgyNjU3ODg3ODQ2NDEx.W0n5ag.yFUH8pvN-y1ZPDDntrl8Sm-TFec",
  server_id: "467406309755715595",
  whitelist_id: "467406702006894592",
  redirect_url: "http://127.0.0.1:7790/authenticate",
  updateInterval: 30
};

import('./discord/bot');
import('./discord/express');

//--------------------------------------------------------------------------------------//
//                                  Resource Restarter                                  //
//--------------------------------------------------------------------------------------//
alt.on('ConnectionComplete', () => {
  alt.log("[31LB] Connected to Database");
  sortMarkers();

  if (!alt.getSyncedMeta("restarted")) {
    loadVehicles();
  }
  alt.setSyncedMeta("restarted", false);

  alt.setTimeout(() => {
    alt.Player.all.forEach((p) => {
      createBlips(p);
    });
  }, 1000);
});

alt.on("resourceStop",  () => {
  if (!safeStopped) {
    alt.log("~r~======{ Du Pimmock");
    alt.log("~y~Datenbankverbindung schlägt beim konventionellen Neustarten fehl und nichts wird gespeichert.");
    alt.log("~y~Verwende stattdessen: 'rp [r]estart' oder 'rp [s]top'.");
    alt.log("~r~======{ Ende der Durchsage");
  }
});

//--------------------------------------------------------------------------------------//
//                                   Register Events                                    //
//--------------------------------------------------------------------------------------//
alt.on("playerConnect", playerConnect);
alt.on('playerDeath', playerDeath);
alt.on("playerDamage", playerDamage);
alt.on("playerDisconnect", playerActualDisconnect);
alt.on("entityEnterColshape", enteredColshape);
alt.on("entityLeaveColshape", leaveColshape);
alt.on("consoleCommand", consoleCommand);

alt.onClient("a_keyup_f9", keyPressF9);
alt.onClient("a_keyup_y", keyPressY);
alt.onClient("a_keyup_i", keyPressI);
alt.onClient("a_keyup_m", keyPressM);

alt.onClient("a_saveNewPlace", savePlace);
alt.onClient("a_updatePlacesForPlayer", updatePlacesForPlayer);
alt.onClient("a_openinventory", openedInventory);
alt.onClient("a_teamlogin", teamLogin);
alt.onClient("a_teamlogoff", teamLogoff);
alt.onClient("a_toggleKeyPress", toggleKeypress);

//--------------------------------------------------------------------------------------//
//                             Register Interact Functions                              //
//--------------------------------------------------------------------------------------//
let if_list: List<string, CallableFunction>[] = [
  //Beispiel: Key als String aus der Datenbank und vlaue ist eine Funktion
  //{ key: "globalAutobahnFn", value: globalAutobahnFn },
];

alt.onClient("event_interact_function", (player: alt.Player, colShapeMeta: colshapeMeta) => {
  let exec = false;
  if_list.forEach((element) => {
    if (element.key == colShapeMeta.interact_function) {
      element.value(player);
      exec = true;
      return;
    }
  });
  if (!exec) {
    alt.logWarning("Unregistered function: " + colShapeMeta.interact_function);
  }
});

//--------------------------------------------------------------------------------------//
//                                     Init Weather                                     //
//--------------------------------------------------------------------------------------//
const apiKey = "63fe821e3bbfe092b2d68f232317f9c2";
initWeather(apiKey);

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


  //player.spawn(402.5164, -1002.847, -99.2587, 0); //Character Creator