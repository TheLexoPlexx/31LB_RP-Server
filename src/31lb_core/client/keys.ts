/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { toggleInfoHud } from './interactions/infohud';
import { toggleInventory } from './interactions/inventory';
import { togglePlayerMenu } from './interactions/playerMenu';
import { drawSubtitle } from './util/messenger';

export function enableKeys() {
  alt.setMeta("allowKeyPress", true);
}

export function disableKeys() {
  alt.setMeta("allowKeyPress", false);
}

export function keyPress(key: number): void {
  if (alt.getMeta("allowKeyPress") && !alt.isConsoleOpen()) {
    if (key == 115) { //F4
      alt.emitServer("a_keyup_f4");
  
      //game.requestIpl("apa_v_mp_h_01_b");
    } else if (key == 120) { //F9
      alt.emitServer("a_keyup_f9");

    } else if (key == 89) { //y
      toggleInfoHud();
      alt.emitServer("a_keyup_y");
  
    } else if (key == 73) { //i
      alt.emitServer("a_keyup_i");
      alt.log("Toggle Inventory");

      toggleInventory();

      alt.emitServer("a_openinventory");
      
    } else if (key == 69) { //e
      if (alt.getMeta("interaction_function") != (null || undefined )) {
        alt.emit("event_interact_function", alt.getMeta("interaction_function"));
        alt.emitServer("event_interact_function", alt.getMeta("interaction_function"));
      }
      
    } else if (key == 77) { //M
      alt.emitServer("a_keyup_m");

      togglePlayerMenu();
    }
  }
}