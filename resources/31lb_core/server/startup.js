import * as alt from 'alt-server';
import SQL from './util/database';
import * as entities from './entities/entities.js';
import { playerConnect } from './eventHandlers/playerConnect';
import { playerDamage } from './eventHandlers/playerDamage';
import { playerDeath } from './eventHandlers/playerDeath';
import { playerActualDisconnect, playerRestartDisconnect } from './eventHandlers/playerDisconnect';
import { keyPressF9, keyPressI, keyPressM, keyPressY } from './eventHandlers/keyHandlers';
import { createBlips, login } from './eventHandlers/loginCompleted';
import { clearColshapes, savePlace, sortMarkers, updatePlacesForPlayer } from './eventHandlers/placeHandler';
import { openedInventory } from './eventHandlers/inventoryHandler';
import { teamLogin, teamLogoff } from './eventHandlers/teamLoginHandler';
import { loadVehicles, saveVehicles } from './managers/vehicleManager';
import { initWeather } from './eventHandlers/weather';
export const dbHost = 'localhost';
export const dbPort = '5433';
export const dbUsername = '31lb_rpdb';
export const dbPassword = '31lb_rpdb';
export const dbName = '31lb_rpdb';
export var database = new SQL('postgres', dbHost, dbPort, dbUsername, dbPassword, dbName, [
    entities.PlayerEntity, entities.WeaponEntity, entities.PlaceEntity, entities.VehicleEntity
]);
let safeStopped = false;
alt.on('ConnectionComplete', () => {
    alt.log("[31LB] Connected to Database");
    sortMarkers();
    if (!alt.getSyncedMeta("restarted")) {
        loadVehicles();
        alt.setSyncedMeta("restarted", false);
    }
    else {
        alt.setSyncedMeta("restarted", false);
    }
    alt.setTimeout(() => {
        alt.Player.all.forEach((p) => {
            createBlips(p);
        });
    }, 1000);
});
alt.on("resourceStop", () => {
    if (!safeStopped) {
        alt.logError("======{ Du Pimmock");
        alt.logWarning("Datenbankverbindung schlägt beim konventionellen Neustarten fehl und nichts wird gespeichert.");
        alt.logWarning("Verwende stattdessen: 'rp restart' oder 'rp stop'.");
        alt.logError("======{ Ende der Durchsage");
    }
});
alt.on("playerConnect", playerConnect);
alt.on('playerDeath', playerDeath);
alt.on("playerDamage", playerDamage);
alt.on("playerDisconnect", playerActualDisconnect);
alt.on("consoleCommand", (...args) => {
    if (args[0] == "rp") {
        if (args[1] == "restart" || args[1] == "r") {
            save("a_restart_rp");
        }
        else if (args[1] == "stop" || args[1] == "s") {
            save("a_stop_rp");
        }
        else {
            alt.logError("Falscher Subcommand");
        }
    }
    else {
        alt.logError("Unknown command");
    }
    function save(emitEvent) {
        clearColshapes();
        alt.Player.all.forEach((p) => {
            playerRestartDisconnect(p);
        });
        safeStopped = true;
        if (alt.Vehicle.all.length > 0) {
            saveVehicles().then(() => {
                alt.emit(emitEvent);
            });
        }
        else {
            alt.log("[31LB] No vehicles found to save");
        }
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
let if_list = [];
alt.onClient("event_interact_function", (player, colShapeMeta) => {
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
const apiKey = "63fe821e3bbfe092b2d68f232317f9c2";
initWeather(apiKey);
alt.on('character:Done', (player, data) => {
    alt.emit("character:Sync", player, data);
    player.pos = player.pos;
    console.log(data);
});
