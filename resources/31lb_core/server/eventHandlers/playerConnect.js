import * as alt from 'alt-server';
import sjcl from 'sjcl';
import { database, discord } from '../startup';
import { currentDate, weatherType } from './weather';
import { globalMarkers, unlockableMarkers } from './placeHandler';
import { getPlayer, updatePlayer } from '../managers/playerManager';
import { spawnNewVehicle } from '../managers/vehicleManager';
import { checkpointMetaPath, checkpoints, hasCheckpoint } from '../util/checkpoints';
import tables from '../database/tables';
export function playerConnect(player) {
    const ip = encodeURI(`${discord.redirect_url}`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=${discord.client_id}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;
    let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip) + (Math.random() * (900000000 - 0)));
    const playerToken = sjcl.codec.hex.fromBits(hashBytes);
    player.setSyncedMeta("discord_token", playerToken);
    alt.emitClient(player, "a_discordAuth", `${url}&state=${playerToken}`);
    player.setWeather(weatherType);
    player.setDateTime(currentDate.day, currentDate.month, currentDate.year, currentDate.hour, currentDate.minute, currentDate.second);
    player.spawn(402.5164, -1002.847, -99.2587, 0);
}
export function discordAuthDone(player, discord) {
    player.setSyncedMeta("name", discord.username + "#" + discord.discriminator);
    player.setSyncedMeta("uuid", discord.id);
    player.setSyncedMeta("allowKeyPress", true);
    alt.log("UUID: " + player.getSyncedMeta("uuid"));
    getPlayer(player, (playerResult) => {
        player.setSyncedMeta("money_hand", playerResult.money_hand);
        player.setSyncedMeta("money_bank", playerResult.money_bank);
        player.health = playerResult.healthpoints;
        player.armour = playerResult.armour;
        player.spawn(playerResult.pos.x, playerResult.pos.y, playerResult.pos.z, 0);
        player.rot = new alt.Vector3(playerResult.rot.x, playerResult.rot.z, playerResult.rot.z);
        player.setSyncedMeta("permissions", playerResult.permissions);
        player.model = 'mp_m_freemode_01';
        if (playerResult.lastvehicle != null) {
            alt.emitClient(player, "a_forceEnterVehicle", playerResult.lastvehicle, playerResult.lastseat - 2);
            alt.log("vehicle " + playerResult.lastvehicle);
        }
        player.setSyncedMeta("fahrzeuge", playerResult.fahrzeuge);
        if (playerResult.fahrzeuge.length == 0) {
            let p = playerResult.pos;
            let pr = playerResult.rot;
            let spawnVehicle = spawnNewVehicle(firstCar[Math.floor(Math.random() * firstCar.length)], p.x, p.y, p.z, pr.x, pr.y, pr.z);
            spawnVehicle.petrolTankHealth = 0;
            spawnVehicle.manualEngineControl = true;
            alt.emitClient(player, "a_disableEngineStart");
            playerResult.fahrzeuge.push(spawnVehicle.getSyncedMeta("vin"));
            player.spawn(spawnVehicle.pos.x, spawnVehicle.pos.y, spawnVehicle.pos.z, 0);
            alt.emitClient(player, "a_forceEnterVehicle", spawnVehicle.getSyncedMeta("vin"), 0);
            let leaveCircle = new alt.ColshapeCircle(p.x, p.y, 50);
            leaveCircle.setMeta("despawnVehicle", spawnVehicle.getSyncedMeta("vin"));
        }
        player.setSyncedMeta("lizenzen", playerResult.lizenzen);
        player.setSyncedMeta("personalausweis", playerResult.personalausweis);
        player.setSyncedMeta("weapons", playerResult.weapons);
        player.setSyncedMeta("job", playerResult.job);
        player.setSyncedMeta("faction", playerResult.faction);
        player.setSyncedMeta("unlocked_places", playerResult.unlockedplaces);
        createBlips(player);
        player.setSyncedMeta("telefonnummer", playerResult.telefonnummer);
        player.setSyncedMeta(checkpointMetaPath, playerResult.checkpoints);
        if (hasCheckpoint(player, checkpoints.went_to_townhall)) {
            database.fetchData("displayname", "Rathaus", tables.places, (result_rathaus) => {
                alt.emitClient(player, "a_setWapoint", result_rathaus);
            });
        }
        updatePlayer(playerResult, (res) => {
            alt.log("Player " + discord.username + "#" + discord.discriminator + " logged in [" + discord.id + "]");
            if (alt.debug) {
                alt.log("playerResult: " + JSON.stringify(playerResult));
                alt.log("discordInfo: " + JSON.stringify(discord));
            }
        });
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
