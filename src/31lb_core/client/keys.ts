/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { toggleInfoHud } from './infohud';
import * as NativeUI from './util/nativeui/NativeUi';

export function keyPress(key: number): void {
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
    alt.log("Open Inventory");
    //open inventory
  }
}