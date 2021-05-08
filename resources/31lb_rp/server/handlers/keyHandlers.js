/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
var menuopen = false;
export function keyPressF9(player) {
    alt.log("F9 pressed");
    alt.emitClient(player, "a_weaponselect_s");
    //generate(player);
}
export function keyPressY(player) {
    //placeholder, only used on client so far
}
export function keyPressI(player) {
    //placeholder, only used on client so far
}
//# sourceMappingURL=keyHandlers.js.map