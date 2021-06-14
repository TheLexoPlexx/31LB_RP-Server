export let checkpoints = {
    went_to_townhall: 0,
};
export let checkpointMetaPath = "checkpoints";
export function getCheckpoints(player) {
    return player.getSyncedMeta(checkpointMetaPath);
}
function setCheckpoints(player, checkpoints) {
    player.setSyncedMeta(checkpointMetaPath, checkpoints);
}
export function addCheckpoint(player, checkpoint) {
    let l = getCheckpoints(player);
    l.push(checkpoint);
    setCheckpoints(player, l);
}
export function removeCheckpoint(player, checkpoint) {
    let l = getCheckpoints(player);
    if (l.includes(checkpoint)) {
        l.splice(l.indexOf(checkpoint), 1);
    }
    setCheckpoints(player, l);
}
export function hasCheckpoint(player, checkpoint) {
    return getCheckpoints(player).includes(checkpoint);
}
