/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import sjcl from 'sjcl';
import { database, discord } from '../startup';
import { currentDate, weatherType } from './weather';
import { globalMarkers, unlockableMarkers } from './placeHandler';
import { getPlayer } from '../managers/playerManager';
import { spawnNewVehicle } from '../managers/vehicleManager';
import { checkpoints } from '../util/checkpoints';
import tables from '../database/tables';

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
  player.spawn(-138.793, -593.407, 211.775, 0); //Aussichtsplattform
  /**
   * TODO: neue Cam über die Stadt schauen lassen vllt. bewegen? (später, Chriss) 
   * mit aktuellem Wetter und Zeit, Login-Knopf hintergrund entfernen, bei authentication dann native.switchOutPlayer
  */

  const ip = encodeURI(`${discord.redirect_url}`);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${discord.client_id}&redirect_uri=${ip}&prompt=none&response_type=code&scope=identify`;

  let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip) + (Math.random() * (900000000 - 0)));
  const playerToken = sjcl.codec.hex.fromBits(hashBytes);

  player.setSyncedMeta("discord_token", playerToken);
  alt.emitClient(player, "a_discordAuth", `${url}&state=${playerToken}`);

  player.setWeather(weatherType);
  player.setDateTime(currentDate.day, currentDate.month, currentDate.year, currentDate.hour, currentDate.minute, currentDate.second);
}

export function discordAuthDone(player: alt.Player, discord: DiscordInfo) {
  player.setSyncedMeta("name", discord.username + "#" + discord.discriminator); //TODO: Fill with Name
  player.setSyncedMeta("uuid", discord.id);
  player.setSyncedMeta("allowKeyPress", true);

  getPlayer(player, (dbP) => {
    player.model = 'mp_m_freemode_01'; //TODO: Auslesen und ändern

    alt.logWarning("Player connected...");
    player.spawn(dbP.pos.x, dbP.pos.y, dbP.pos.z, 0);

    if (dbP.lastvehicle != null) {
      //TODO: Check if player actually has keys to vehicle
      alt.emitClient(player, "a_forceEnterVehicle", dbP.lastvehicle, dbP.lastseat-2);
      alt.log("vehicle " + dbP.lastvehicle);
    }
    
    //TODO: Set Inventory
      
    if (dbP.fahrzeuge.length == 0) {
      let spawnVehicle = spawnNewVehicle(firstCar[Math.floor(Math.random() * firstCar.length)], dbP.pos.x, dbP.pos.y, dbP.pos.z, dbP.rot.x, dbP.rot.y, dbP.rot.z);
      spawnVehicle.petrolTankHealth = 0;
      spawnVehicle.manualEngineControl = true;
      alt.emitClient(player, "a_disableEngineStart");
    
      dbP.fahrzeuge = [];
      dbP.fahrzeuge.push(spawnVehicle.getSyncedMeta("vin"));
      dbP.save();
    
      player.spawn(spawnVehicle.pos.x, spawnVehicle.pos.y, spawnVehicle.pos.z, 0);
      alt.emitClient(player, "a_forceEnterVehicle", spawnVehicle.getSyncedMeta("vin"), 0);
    
      /*
      //TODO: Despawn Spawn-Vehicle on disconnect
      let leaveCircle = new alt.ColshapeCircle(dbP.pos.x, dbP.pos.y, 50);
      leaveCircle.setMeta("despawnVehicle", spawnVehicle.getSyncedMeta("vin"));
      */
    }

    createBlips(player);

    if (dbP.hasCheckpoint(checkpoints.went_to_townhall)) {
      let result_rathaus = database.fetchDataAsync("displayname", "Rathaus", tables.places);
      if (result_rathaus != undefined) {
        result_rathaus.then(res => {
          //TODO: Checkpoint entfernen wenn der Spieler die ihm auferlegten Aufgaben erfüllt hat.
          alt.emitClient(player, "a_setWapoint", res);
        });
      }
    }
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