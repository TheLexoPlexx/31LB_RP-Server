import * as alt from 'alt-client';
import * as game from 'natives';
import Control from './enums/Control';
import InstructionalButton from './modules/InstructionalButton';
import Scaleform from './utils/Scaleform';
let menuPool = [];
export default class NativeUI {
    constructor() {
        this._visible = true;
        this._buttonsEnabled = true;
        this._justOpened = true;
        this._justOpenedFromPool = false;
        this._justClosedFromPool = false;
        this._poolOpening = null;
        this._instructionalButtons = [];
        this.SelectTextLocalized = alt.getGxtText("HUD_INPUT2");
        this.BackTextLocalized = alt.getGxtText("HUD_INPUT3");
        this.WidthOffset = 0;
        this.ParentMenu = null;
        this.MouseControlsEnabled = false;
        this.CloseableByUser = true;
        this._instructionalButtonsScaleform = new Scaleform("instructional_buttons");
        this.UpdateScaleform();
        this._visible = false;
        alt.everyTick(this.render.bind(this));
    }
    get Visible() {
        return this._visible;
    }
    set Visible(toggle) {
        this._visible = toggle;
        this.UpdateScaleform();
        if (this._justOpenedFromPool === true) {
            this._justOpenedFromPool = false;
            return;
        }
        if (toggle) {
            this._justOpened = true;
            if (this.ParentMenu === null) {
                if (!menuPool.includes(this) && this !== this._poolOpening) {
                    const previousMenu = (menuPool.length) ? menuPool[menuPool.length - 1] : null;
                    menuPool.push(this);
                    if (previousMenu !== this._poolOpening && previousMenu !== null) {
                        previousMenu._justClosedFromPool = true;
                        previousMenu.Visible = false;
                    }
                }
            }
        }
        else {
            if (this._justClosedFromPool === true) {
                this._justClosedFromPool = false;
                return;
            }
            if (this.ParentMenu === null && menuPool.includes(this) && menuPool.length) {
                if (menuPool[menuPool.length - 1] === this) {
                    menuPool.pop();
                    this._justOpenedFromPool = true;
                    if (!menuPool.length) {
                        this._poolOpening = null;
                    }
                }
                if (menuPool.length) {
                    this._poolOpening = menuPool[menuPool.length - 1];
                    menuPool[menuPool.length - 1].Visible = true;
                }
            }
            if (menuPool.length === 0) {
                game.setMouseCursorSprite(1);
            }
        }
    }
    DisableInstructionalButtons(disable) {
        this._buttonsEnabled = !disable;
    }
    AddInstructionalButton(button) {
        this._instructionalButtons.push(button);
    }
    RemoveInstructionalButton(button) {
        for (let i = 0; i < this._instructionalButtons.length; i++) {
            if (this._instructionalButtons[i] === button) {
                this._instructionalButtons.splice(i, 1);
            }
        }
    }
    Open() {
        this.Visible = true;
    }
    CleanUp(closeChildren = false) {
        if (closeChildren) {
            this.Children.forEach(m => {
                m.Close(true);
            });
        }
    }
    Close(closeChildren = false) {
        this.Visible = false;
        this.CleanUp(closeChildren);
    }
    ProcessControl() {
        if (!this.Visible)
            return;
        if (this._justOpened) {
            this._justOpened = false;
            return;
        }
    }
    UpdateScaleform() {
        if (!this.Visible || !this._buttonsEnabled)
            return;
        this._instructionalButtonsScaleform.callFunction("CLEAR_ALL");
        this._instructionalButtonsScaleform.callFunction("TOGGLE_MOUSE_BUTTONS", 0);
        this._instructionalButtonsScaleform.callFunction("CREATE_CONTAINER");
        this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", 0, game.getControlInstructionalButton(2, Control.PhoneSelect, false), this.SelectTextLocalized);
        this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", 1, game.getControlInstructionalButton(2, Control.PhoneCancel, false), this.BackTextLocalized);
        let count = 2;
        this._instructionalButtons.forEach((button) => {
            this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", count, button.GetButtonId(), button.Text);
            count++;
        });
        this._instructionalButtonsScaleform.callFunction("DRAW_INSTRUCTIONAL_BUTTONS", -1);
    }
    render() {
        if (!this.Visible)
            return;
        if (this._buttonsEnabled) {
            game.drawScaleformMovieFullscreen(this._instructionalButtonsScaleform.handle, 255, 255, 255, 255, 0);
            game.hideHudComponentThisFrame(6);
            game.hideHudComponentThisFrame(7);
            game.hideHudComponentThisFrame(9);
        }
        this.ProcessControl();
        let count = 0;
    }
}
export { NativeUI as Menu, Control, InstructionalButton, };
