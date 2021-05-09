import * as game from 'natives';
import Control from '../enums/Control';

export default class InstructionalButton {
    public Text: string;

    private readonly _buttonString: string;
    private readonly _buttonControl: Control;
    private readonly _usingControls: boolean;

    /*
    * Add a dynamic button to the instructional buttons array.
    * Changes whether the controller is being used and changes depending on keybinds.
    * @param control GTA.Control that gets converted into a button.
    * @param keystring Custom keyboard button, like "I", or "O", or "F5".
    * @param text Help text that goes with the button.
    */
    constructor(text: string, control: Control, buttonString: string = null) {
        this.Text = text;
        this._buttonControl = control;
        this._usingControls = buttonString == null;
        this._buttonString = buttonString;
    }

    public GetButtonId(): string {
        return this._usingControls ? game.getControlInstructionalButton(2, this._buttonControl as number, false) : "t_" + this._buttonString;
    }
}
