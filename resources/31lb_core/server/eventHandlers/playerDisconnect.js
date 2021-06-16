import * as alt from 'alt-server';
import { getOfflinePlayer } from '../managers/playerManager';
export function playerActualDisconnect(player) {
    playerDisconnect(player, false);
}
export function playerRestartDisconnect(player) {
    playerDisconnect(player, true);
}
function playerDisconnect(player, restart) {
    let pR = {
        uuid: player.getSyncedMeta("uuid"),
        healthpoints: player.health,
        armour: player.armour,
        pos: player.pos,
        rot: player.rot,
    };
    getOfflinePlayer(pR.uuid, (pl) => {
        alt.log("pl: " + JSON.stringify(pl));
        pl.healthpoints = pR.healthpoints;
        pl.armour = pR.armour;
        pl.pos = pR.pos;
        pl.rot = pR.rot;
        pl.save();
    });
}
