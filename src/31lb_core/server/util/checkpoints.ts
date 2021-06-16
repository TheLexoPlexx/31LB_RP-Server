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