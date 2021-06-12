/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import * as sjcl from "sjcl";
import { database, discord } from '../startup';
import { currentDate, weatherType } from './weather';
import { globalMarkers, unlockableMarkers } from './placeHandler';
import { getPlayer, PlayerType, updatePlayer } from '../managers/playerManager';
import { spawnNewVehicle } from '../managers/vehicleManager';
import { checkpointMetaPath, checkpoints, hasCheckpoint } from '../util/checkpoints';
import tables from '../database/tables';

const ip = encodeURI(`${discord.redirect_url}`);
const url = `https://discord.com/api/oauth2/authorize?client_id=${discord.client_id}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;

interface DiscordInfo {
  id: string,
  username: string,
  flags: number,
  public_flags: number,
  avatar: string,
  discriminator: number,
  mfa_enabled: boolean,
  locale: string,
}

export function playerConnect(player: alt.Player) {
  /*
  let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip) + (Math.random() * (900000000 - 0)));
  const playerToken = sjcl.codec.hex.fromBits(hashBytes);

  player.setSyncedMeta("discord_token", playerToken);
  alt.emitClient(player, "a_discordAuth", `${url}&state=${playerToken}`);
  */

  player.setWeather(weatherType);
  player.setDateTime(currentDate.day, currentDate.month, currentDate.year, currentDate.hour, currentDate.minute, currentDate.second);

  /**
   * TODO: neue Cam über die Stadt schauen lassen vllt. bewegen? (später, Chriss) 
   * mit aktuellem Wetter und Zeit, Login-Knopf hintergrund entfernen, bei authentication dann native.switchOutPlayer
   */

  player.spawn(402.5164, -1002.847, -99.2587, 0); //Character Creator

}

export function discordAuthDone(player: alt.Player, discord: DiscordInfo) {
  player.setSyncedMeta("name", discord.username + "#" + discord.discriminator); //TODO: Fill with Name
  player.setSyncedMeta("uuid", discord.id);
  player.setSyncedMeta("allowKeyPress", true);

  getPlayer(player, (playerResult: PlayerType) => {

    player.setSyncedMeta("money_hand", playerResult.money_hand);
    player.setSyncedMeta("money_bank", playerResult.money_bank);

    player.health = playerResult.healthpoints;
    player.armour = playerResult.armour;

    player.spawn(playerResult.pos.x, playerResult.pos.y, playerResult.pos.z, 0);
    player.rot = new alt.Vector3(playerResult.rot.x, playerResult.rot.z, playerResult.rot.z);

    player.setSyncedMeta("permissions", playerResult.permissions);

    player.model = 'mp_m_freemode_01'; //TODO: Auslesen und ändern

    if (playerResult.lastvehicle != null) {
      //TODO: Check if player actually has keys to vehicle
      alt.emitClient(player, "a_forceEnterVehicle", playerResult.lastvehicle, playerResult.lastseat-2);
      alt.log("vehicle " + playerResult.lastvehicle);
    }

    //TODO: Set Inventory
    
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
        //TODO: Checkpoint entfernen wenn der Spieler die ihm auferlegten Aufgaben erfüllt hat.
        alt.emitClient(player, "a_setWapoint", result_rathaus);
      });
    }

    updatePlayer(playerResult, (res) => {
      alt.log("Player " + discord.username + "#" + discord.discriminator + " logged in [" + discord.id + "]");

      //For Development
      if (alt.debug) {
        alt.log("playerResult: " + JSON.stringify(playerResult));
        alt.log("discordInfo: " + JSON.stringify(discord));
      }
    })
  });
}

export function createBlips(player: alt.Player) {
  let unlocked_places = player.getSyncedMeta("unlocked_places");
  if (unlocked_places != undefined) {
    if (unlocked_places.length > 0) {
      unlocked_places.forEach(element => {
        unlockableMarkers.forEach(allM => {
          if (allM.id == element) {
            alt.emitClient(player, "a_createBlip", allM);
            //element is only id
            //maybe remove element?
          }
        });
      });
    }
  
    //Erstellen der Blips auf der Karte
    globalMarkers.forEach(element => {
      alt.emitClient(player, "a_createBlip", element);
    });
  }
}

const firstCar = [
  //Vehicles reserved for Beta Testers:
  "tornado3",
  "tornado4",
  /*
  Vehicles for Release:
  "bodhi2",
  "emperor2",
  //"BfInjection",
  "ratloader", //Roof 4?
  "rebel",
  "voodoo2",
  */
];