/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { toggleInfoHud } from './interactions/infohud';
import { toggleInventory } from './interactions/inventory';
import { colshapeMeta } from './interactions/placeGenerator';
import { togglePlayerMenu } from './interactions/playerMenu';
import { openShopInteraction } from './interactions/shopInteraction';

export function keyUp(key: number): void {
  if (alt.Player.local.getSyncedMeta("allowKeyPress") && !alt.isConsoleOpen()) {
    if (key == 89) { //y
      alt.emitServer("a_keyup_y");
      
      toggleInfoHud();
  
    } else if (key == 73) { //i
      alt.emitServer("a_keyup_i");
      alt.log("Toggle Inventory");

      toggleInventory();

      alt.emitServer("a_openinventory");
      
    } else if (key == 69) { //e,
      if (alt.getMeta("interaction_meta") != (null || undefined)) {
        let cM: colshapeMeta = alt.getMeta("interaction_meta");
        if (cM.interact_function.startsWith("shop_")) {
          openShopInteraction(cM);
        } else {
          alt.emit("event_interact_function", alt.getMeta("interaction_meta"));
          alt.emitServer("event_interact_function", alt.getMeta("interaction_meta"));
        }
      }
      
    } else if (key == 115) { //F4
      alt.emitServer("a_keyup_f4");

      togglePlayerMenu();
      
    }
  }
}