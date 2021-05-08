/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
export function playerConnect(player) {
    alt.emitClient(player, "a_connect");
    player.spawn(229.9559, -981.7928, -99.66071); //10-car-garage
}
//# sourceMappingURL=playerConnect.js.map