import * as alt from 'alt-client';
import { toggleInfoHud } from './interactions/infohud';
import { toggleInventory } from './interactions/inventory';
import { togglePlayerMenu } from './interactions/playerMenu';
import { toggleQuickGPS } from './interactions/quickgps';
import { openShopInteraction } from './interactions/shopInteraction';
let ctrlPressed = false;
export function keyDown(key) {
    if (alt.Player.local.getSyncedMeta("allowKeyPress") && !alt.isConsoleOpen()) {
        if (key == 17) {
            ctrlPressed = true;
        }
    }
}
export function keyUp(key) {
    if (alt.Player.local.getSyncedMeta("allowKeyPress") && !alt.isConsoleOpen()) {
        if (key == 89) {
            alt.emitServer("a_keyup_y");
            toggleInfoHud();
        }
        else if (key == 120) {
            alt.emitServer("a_keyup_f9");
            if (alt.Player.local.seat > 0) {
                alt.log("fahrzeugposition: " + JSON.stringify({
                    px: alt.Player.local.vehicle.pos.x,
                    py: alt.Player.local.vehicle.pos.y,
                    pz: alt.Player.local.vehicle.pos.z,
                    rx: alt.Player.local.vehicle.rot.x,
                    yx: alt.Player.local.vehicle.rot.y,
                    zx: alt.Player.local.vehicle.rot.z,
                    model: alt.Player.local.vehicle.model
                }));
                alt.log("VIN: " + alt.Player.local.vehicle.getSyncedMeta("vin"));
            }
            else {
                alt.log("position: " + JSON.stringify({
                    px: alt.Player.local.pos.x,
                    py: alt.Player.local.pos.y,
                    pz: alt.Player.local.pos.z,
                    rx: alt.Player.local.rot.x,
                    yx: alt.Player.local.rot.y,
                    zx: alt.Player.local.rot.z,
                }));
            }
        }
        else if (key == 73) {
            alt.emitServer("a_keyup_i");
            toggleInventory();
            alt.emitServer("a_openinventory");
        }
        else if (key == 69) {
            if (alt.getMeta("interaction_meta") != (null || undefined)) {
                let cM = alt.getMeta("interaction_meta");
                if (cM.interact_function.startsWith("shop_")) {
                    openShopInteraction(cM);
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
        else if (key == 70) {
            if (ctrlPressed) {
                toggleQuickGPS();
            }
            else {
                alt.log("Paid respect.");
            }
        }
        else if (key == 17) {
            ctrlPressed = false;
        }
    }
}
