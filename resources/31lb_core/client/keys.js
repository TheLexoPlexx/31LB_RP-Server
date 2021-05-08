import * as alt from 'alt-client';
import { toggleInfoHud } from './infohud';
export function keyPress(key) {
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
    }
}
