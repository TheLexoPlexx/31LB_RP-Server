/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { toggleInfoHud } from './infohud';
import * as NativeUI from './lib/nativeui/nativeui';

export function keyPress(key) {
  if (key == 115) { //F4
    alt.emitServer("a_keyup_f4");

    //game.requestIpl("apa_v_mp_h_01_b");
  } else if (key == 120) { //F9
    alt.emitServer("a_keyup_f9");

    var buttons = new Scaleform("instructional_buttons");

    //FIXME: Doesn't do the thing.
    buttons.callFunction("CLEAR_ALL");
    buttons.callFunction("TOGGLE_MOUSE_BUTTONS", 0);
    buttons.callFunction("CREATE_CONTAINER");
    buttons.callFunction("SET_DATA_SLOT", 0, native.getControlInstructionalButton(2, NativeUI.Control.PhoneSelect, false), "select");
    buttons.callFunction("SET_DATA_SLOT", 1, native.getControlInstructionalButton(2, NativeUI.Control.PhoneCancel, false), "back");
    buttons.callFunction("DRAW_INSTRUCTIONAL_BUTTONS", -1);
    native.drawScaleformMovieFullscreen(buttons.handle, 255, 255, 255, 255, 0);
    native.hideHudComponentThisFrame(6);
    native.hideHudComponentThisFrame(7);
    native.hideHudComponentThisFrame(9);

  } else if (key == 89) { //y
    toggleInfoHud();
    alt.emitServer("a_keyup_y");

  } else if (key == 73) { //i
    alt.emitServer("a_keyup_i");
    alt.log("Open Inventory");
    //open inventory
  }
}

class Scaleform {
  constructor(scaleForm) {
      this._handle = 0;
      this.scaleForm = scaleForm;
      this._handle = native.requestScaleformMovie(this.scaleForm);
  }
  get handle() {
      return this._handle;
  }
  get isValid() {
      return this._handle != 0;
  }
  get isLoaded() {
      return native.hasScaleformMovieLoaded(this._handle);
  }
  callFunctionHead(funcName, ...args) {
      if (!this.isValid || !this.isLoaded)
          return;
      native.beginScaleformMovieMethod(this._handle, funcName);
      args.forEach((arg) => {
          switch (typeof arg) {
              case "number":
                  {
                      if (Number(arg) === arg && arg % 1 !== 0) {
                          native.scaleformMovieMethodAddParamFloat(arg);
                      }
                      else {
                          native.scaleformMovieMethodAddParamInt(arg);
                      }
                  }
              case "string":
                  {
                      native.scaleformMovieMethodAddParamPlayerNameString(arg);
                      break;
                  }
              case "boolean":
                  {
                      native.scaleformMovieMethodAddParamBool(arg);
                      break;
                  }
              default:
                  {
                      alt.logError(`Unknown argument type ${typeof arg} = ${arg.toString()} passed to scaleform with handle ${this._handle}`);
                  }
          }
      });
  }
  callFunction(funcName, ...args) {
      this.callFunctionHead(funcName, ...args);
      native.endScaleformMovieMethod();
  }
  callFunctionReturn(funcName, ...args) {
      this.callFunctionHead(funcName, ...args);
      return native.endScaleformMovieMethodReturnValue();
  }
  render2D() {
      if (!this.isValid || !this.isLoaded)
          return;
      native.drawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, 0);
  }
  recreate() {
      if (!this.isValid || !this.isLoaded)
          return;
      native.setScaleformMovieAsNoLongerNeeded(this._handle);
      this._handle = native.requestScaleformMovie(this.scaleForm);
  }
  destroy() {
      if (!this.isValid)
          return;
      native.setScaleformMovieAsNoLongerNeeded(this._handle);
      this._handle = 0;
  }
}