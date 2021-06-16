import { getPlayer } from '../managers/playerManager';
export function playerActualDisconnect(player) {
    playerDisconnect(player, false);
}
export function playerRestartDisconnect(player) {
    playerDisconnect(player, true);
}
function playerDisconnect(player, restart) {
    getPlayer(player).save();
}
