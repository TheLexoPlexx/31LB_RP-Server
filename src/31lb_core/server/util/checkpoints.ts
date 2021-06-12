/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

/**
 * Checkpoints sind eine Art-und-Weise um zu speichern wo ein Spieler schon war
 * oder ob er ihm auferlegte Aufgaben bereits erfüllt hat. Zum Beispiel wird im Spieler der Checkpoint mit der
 * Nummer 0 gespeichert wenn er beim Rathaus war und den Checkpoint nach dem Joinen dort eingesammelt hat.
 */
export let checkpoints = {
  went_to_townhall: 0,
};


export let checkpointMetaPath = "checkpoints";

export function getCheckpoints(player: alt.Player): number[] {
  return player.getSyncedMeta(checkpointMetaPath);
}

function setCheckpoints(player: alt.Player, checkpoints: number[]) {
  player.setSyncedMeta(checkpointMetaPath, checkpoints);
}

export function addCheckpoint(player: alt.Player, checkpoint: number) {
  let l = getCheckpoints(player);
  l.push(checkpoint);
  setCheckpoints(player, l);
}

export function removeCheckpoint(player: alt.Player, checkpoint: number) {
  let l = getCheckpoints(player);
  if (l.includes(checkpoint)) {
    l.splice(l.indexOf(checkpoint), 1);
  }
  setCheckpoints(player, l);
}

export function hasCheckpoint(player: alt.Player, checkpoint: number): boolean {
  return getCheckpoints(player).includes(checkpoint);
}