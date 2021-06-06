/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import SQL from './database/database';
import * as entities from './database/entities.js';
import { playerConnect } from './eventHandlers/playerConnect';
import { playerDamage } from './eventHandlers/playerDamage';
import { playerDeath } from './eventHandlers/playerDeath';
import { playerActualDisconnect, playerRestartDisconnect } from './eventHandlers/playerDisconnect';
import { keyPressF9, keyPressI, keyPressM, keyPressY } from './eventHandlers/keyHandlers';
import { createBlips, login } from './eventHandlers/loginCompleted';
import { clearColshapes, savePlace, sortMarkers, updatePlacesForPlayer } from './eventHandlers/placeHandler';
import { openedInventory } from './eventHandlers/inventoryHandler';
import { teamLogin, teamLogoff } from './eventHandlers/teamLoginHandler';
import { colshapeMeta } from '../client/interactions/placeGenerator';
import { loadVehicles, saveVehicles } from './managers/vehicleManager';
import { initWeather } from './eventHandlers/weather';

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
//                                  Resource Restarter                                  //
//--------------------------------------------------------------------------------------//
let safeStopped: boolean = false;

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
alt.on("consoleCommand", (...args: string[]) => {
  if (args[0] == "rp") {
    if (args[1] == "restart" || args[1] == "r") {
      save("a_restart_rp");
    } else if (args[1] == "stop" || args[1] == "s") {
      save("a_stop_rp");
    } else {
      alt.logError("Falscher Subcommand");
    }
  } else {
    alt.logError("Unknown command");
  }

  function save(emitEvent: string) {
    clearColshapes();
    alt.Player.all.forEach((p) => {
      playerRestartDisconnect(p);
    });
    safeStopped = true;

    if (alt.Vehicle.all.length > 0) {
      saveVehicles().then(() => {
        alt.emit(emitEvent);
      });
    } else {
      alt.log("[31LB] No vehicles found to save");
      alt.emit(emitEvent);
    }
    //TODO: Save Players
  }

});

alt.onClient("a_keyup_f9", keyPressF9);
alt.onClient("a_keyup_y", keyPressY);
alt.onClient("a_keyup_i", keyPressI);
alt.onClient("a_keyup_m", keyPressM);

alt.onClient("a_login", login);
alt.onClient("a_saveNewPlace", savePlace);
alt.onClient("a_updatePlacesForPlayer", updatePlacesForPlayer);
alt.onClient("a_openinventory", openedInventory);
alt.onClient("a_teamlogin", teamLogin);
alt.onClient("a_teamlogoff", teamLogoff);

alt.on('discord:AuthDone', (player, discordInfo)=> {
  alt.log("Connected: " +  JSON.stringify(discordInfo));
});

//--------------------------------------------------------------------------------------//
//                             Register Interact Functions                              //
//--------------------------------------------------------------------------------------//
interface InteractFunction<K extends PropertyKey, V> {
  key: K;
  value: V;
}

let if_list: InteractFunction<string, CallableFunction>[] = [
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