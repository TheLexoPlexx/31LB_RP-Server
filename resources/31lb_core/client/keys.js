import * as alt from 'alt-client';
import { toggleInfoHud } from './infohud';
import { toggleInventory } from './inventory';
export function enableKeys() {
    alt.setMeta("allowKeyPress", true);
}
export function disableKeys() {
    alt.setMeta("allowKeyPress", false);
}
export function keyPress(key) {
    if (alt.getMeta("allowKeyPress") && !alt.isConsoleOpen()) {
        if (key == 115) {
            alt.emitServer("a_keyup_f4");
        }
        else if (key == 120) {
            alt.emitServer("a_keyup_f9");
        }
        else if (key == 89) {
            toggleInfoHud();
            alt.emitServer("a_keyup_y");
        }
        else if (key == 73) {
            alt.emitServer("a_keyup_i");
            alt.log("Open Inventory");
            toggleInventory();
            alt.emitServer("a_openinventory");
        }
        else if (key == 69) {
            if (alt.getMeta("interaction_function") != (null || undefined)) {
                alt.emit("event_interact_function", alt.getMeta("interaction_function"));
                alt.emitServer("event_interact_function", alt.getMeta("interaction_function"));
            }
        }
    }
}
