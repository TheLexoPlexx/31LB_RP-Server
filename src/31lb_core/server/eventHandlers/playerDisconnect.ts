/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getOfflinePlayer, getPlayer } from '../managers/playerManager';

//FIXME: Playerdata is not properly saved on first disconnect.

export function playerActualDisconnect(player: alt.Player) {
  playerDisconnect(player, false);
}

export function playerRestartDisconnect(player: alt.Player) {
  playerDisconnect(player, true);
}

function playerDisconnect(player: alt.Player, restart: boolean) {
  if (player.getSyncedMeta("uuid") == null) {
    player.kick("You where not logged in while the Server restarted");
    return;
  }

  let pR = {
    uuid: player.getSyncedMeta("uuid"),
    healthpoints: player.health,
    armour: player.armour,
    pos: player.pos,
    rot: player.rot,
  };

  getOfflinePlayer(pR.uuid, (pl) => {
    pl.healthpoints = pR.healthpoints;
    pl.armour = pR.armour;
    pl.pos = pR.pos;
    pl.rot = pR.rot;
    pl.save();
    alt.log("Player " + pl.uuid + " left");
  });
}