import * as alt from 'alt-server';
var menuopen = false;
export function keyPressF9(player) {
    alt.log("F9 pressed");
    alt.emitClient(player, "a_weaponselect_s");
}
export function keyPressY(player) {
}
export function keyPressI(player) {
}
export function keyPressM(player) {
}
