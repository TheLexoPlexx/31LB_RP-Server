/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getPlayer } from '../managers/playerManager';

//FIXME: Playerdata is not properly saved on first disconnect.

export function playerActualDisconnect(player: alt.Player) {
  playerDisconnect(player, false);
}

export function playerRestartDisconnect(player: alt.Player) {
  playerDisconnect(player, true);
}

function playerDisconnect(player: alt.Player, restart: boolean) {
  getPlayer(player).save();

  /*
  let pR = {
    uuid: player.getSyncedMeta("uuid"),
    money_hand: player.getSyncedMeta("money_hand"),
    money_bank: player.getSyncedMeta("money_bank"),
    healthpoints: player.health,
    armour: player.armour,
    pos: JSON.stringify(player.pos),
    rot: JSON.stringify(player.rot),
    permissions: player.getSyncedMeta("permissions"),
    //Character
    lastvehicle: player.vehicle.getSyncedMeta("vin"),
    lastseat: player.seat,
    //Inventar
    firstjoin: player.getSyncedMeta("firstjoin"),
    fahrzeuge: player.getSyncedMeta("fahrzeuge"),
    lizenzen: player.getSyncedMeta("lizenzen"),
    personalausweis: player.vehicle.getSyncedMeta("personalausweis"),
    weapons: player.getSyncedMeta("weapons"),
    job: player.getSyncedMeta("job"),
    faction: player.getSyncedMeta("faction"),
    unlockedplaces: player.getSyncedMeta("unlocked_places"),
    telefonnummer: player.getSyncedMeta("telefonnummer"),
    checkpoints: player.getSyncedMeta(checkpointMetaPath),
  };
  */
}