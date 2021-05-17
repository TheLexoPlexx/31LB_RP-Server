/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

export function teamLogin(player: alt.Player) {
  if (player.getSyncedMeta("permissions") >= 30) {
    player.setSyncedMeta("team_onduty", true);
  } else {
    alt.logError("Player " + alt.Player.name + " tried to go on duty without permissions");
  }
}

export function teamLogoff(player: alt.Player) {
  player.setSyncedMeta("team_onduty", false);
}