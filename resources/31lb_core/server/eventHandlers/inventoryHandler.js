import * as alt from 'alt-server';
export function openedInventory(player) {
    let pos = player.pos;
    player.pos = pos;
    let rot = player.rot;
    player.rot = new alt.Vector3(0, 90, player.rot.z);
}
