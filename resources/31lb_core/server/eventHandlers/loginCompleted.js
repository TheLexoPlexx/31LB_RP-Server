import * as alt from 'alt-server';
import * as pm from "./../managers/playerManager";
import { database } from '../startup';
import { globalMarkers, unlockableMarkers } from './placeHandler';
import tables from '../database/tables';
import { spawnNewVehicle } from '../managers/vehicleManager';
export function loginCompleted(player, discordInfo) {
    database.fetchData("uuid", discordInfo.id, tables.players, (result_player) => {
        var playerJSON;
        if (result_player == undefined) {
            var d = new Date();
            var date = d.getDate().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString();
            let default_player = {
                uuid: discordInfo.id,
                money_hand: 0,
                money_bank: 400,
                healthpoints: player.maxHealth,
                armour: player.maxArmour,
                firstjoin: date,
                permissions: 1,
                activeWeapons: JSON.stringify({ a: null, b: null, h: null }),
                unlockedplaces: "[]",
                fahrzeuge: "[]",
                telefonnummer: Math.round(Math.random() * 100000000)
            };
            let spawnPoint = pm.randomFirstSpawnPosition();
            let spawnVehicle = spawnNewVehicle(firstCar[Math.floor(Math.random() * firstCar.length)], spawnPoint.px, spawnPoint.py, spawnPoint.pz, spawnPoint.rx, spawnPoint.ry, spawnPoint.rz);
            spawnVehicle.petrolTankHealth = 0;
            spawnVehicle.manualEngineControl = true;
            alt.emitClient(player, "a_disableEngineStart");
            let fahrzeuge = JSON.parse(default_player.fahrzeuge);
            fahrzeuge.push(spawnVehicle.getSyncedMeta("vin"));
            default_player.fahrzeuge = JSON.stringify(default_player.fahrzeuge);
            player.spawn(spawnVehicle.pos.x, spawnVehicle.pos.y, spawnVehicle.pos.z, 0);
            alt.emitClient(player, "a_forceEnterVehicle", spawnVehicle.getSyncedMeta("vin"), 0);
            let leaveCircle = new alt.ColshapeCircle(spawnPoint.px, spawnPoint.py, 50);
            leaveCircle.setMeta("despawnVehicle", spawnVehicle.getSyncedMeta("vin"));
            pm.setValueForPlayer(default_player, (res) => {
                alt.log("Neuer Spieler: " + JSON.stringify(res));
            });
            playerJSON = default_player;
        }
        else {
            player.model = 'mp_m_freemode_01';
            var pos = JSON.parse(result_player.pos);
            player.spawn(pos.x, pos.y, pos.z, 0);
            player.rot = JSON.parse(result_player.rot);
            player.health = result_player.healthpoints;
            player.armour = result_player.armour;
            if (result_player.lastvehicle != null) {
                alt.emitClient(player, "a_forceEnterVehicle", result_player.lastvehicle, result_player.lastseat - 2);
                alt.log("vehicle " + result_player.lastvehicle);
            }
            pm.setValueForPlayer(result_player, (res) => {
                alt.log("Player " + res.name + " logged in");
            });
            playerJSON = result_player;
        }
        let unlocked_places;
        if (playerJSON.unlockedplaces == "[]" || playerJSON.unlockedplaces == null) {
            unlocked_places = [];
        }
        else {
            unlocked_places = JSON.parse(result_player.unlockedplaces);
        }
        player.setSyncedMeta("unlocked_places", unlocked_places);
        createBlips(player);
        player.setSyncedMeta("money_hand", playerJSON.money_hand);
        if (playerJSON.faction != null) {
            player.setSyncedMeta("faction", playerJSON.faction);
        }
        player.setSyncedMeta("permissions", playerJSON.permissions);
        player.setSyncedMeta("inventar", playerJSON.inventar);
        player.setSyncedMeta("personalausweis", playerJSON.personalausweis);
        player.setSyncedMeta("allowKeyPress", true);
        player.setSyncedMeta("name", "unbenannt");
        player.setSyncedMeta("uuid", discordInfo.id);
    });
}
export function createBlips(player) {
    let unlocked_places = player.getSyncedMeta("unlocked_places");
    if (unlocked_places != undefined) {
        if (unlocked_places.length > 0) {
            unlocked_places.forEach(element => {
                unlockableMarkers.forEach(allM => {
                    if (allM.id == element) {
                        alt.emitClient(player, "a_createBlip", allM);
                    }
                });
            });
        }
        globalMarkers.forEach(element => {
            alt.emitClient(player, "a_createBlip", element);
        });
    }
}
const firstCar = [
    "tornado3",
    "tornado4",
];
