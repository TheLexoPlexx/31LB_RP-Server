"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = require("natives");
class InstructionalButton {
    /*
    * Add a dynamic button to the instructional buttons array.
    * Changes whether the controller is being used and changes depending on keybinds.
    * @param control GTA.Control that gets converted into a button.
    * @param keystring Custom keyboard button, like "I", or "O", or "F5".
    * @param text Help text that goes with the button.
    */
    constructor(text, control, buttonString = null) {
        this._itemBind = null;
        this.Text = text;
        this._buttonControl = control;
        this._usingControls = buttonString == null;
        this._buttonString = buttonString;
    }
    get ItemBind() { return this._itemBind; }
    /*
    * Bind this button to an item, so it's only shown when that item is selected.
    * @param item Item to bind to.
    */
    BindToItem(item) {
        this._itemBind = item;
    }
    GetButtonId() {
        return this._usingControls ? natives_1.default.getControlInstructionalButton(2, this._buttonControl, false) : "t_" + this._buttonString;
    }
}
exports.default = InstructionalButton;
//# sourceMappingURL=InstructionalButton.js.map