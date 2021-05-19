import * as alt from 'alt-client';
import { toggleInfoHud } from './interactions/infohud';
import { toggleInventory } from './interactions/inventory';
import { togglePlayerMenu } from './interactions/playerMenu';
export function keyUp(key) {
    if (alt.Player.local.getSyncedMeta("allowKeyPress") && !alt.isConsoleOpen()) {
        if (key == 89) {
            alt.emitServer("a_keyup_y");
            toggleInfoHud();
        }
        else if (key == 73) {
            alt.emitServer("a_keyup_i");
            alt.log("Toggle Inventory");
            toggleInventory();
            alt.emitServer("a_openinventory");
        }
        else if (key == 69) {
            if (alt.getMeta("interaction_meta") != (null || undefined)) {
                let cM = alt.getMeta("interaction_meta");
                if (cM.interact_function.startsWith("shop_")) {
                }
                else {
                    alt.emit("event_interact_function", alt.getMeta("interaction_meta"));
                    alt.emitServer("event_interact_function", alt.getMeta("interaction_meta"));
                }
            }
        }
        else if (key == 115) {
            alt.emitServer("a_keyup_f4");
            togglePlayerMenu();
        }
    }
}
