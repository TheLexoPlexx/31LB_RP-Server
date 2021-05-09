import * as alt from 'alt-client';
import * as game from 'natives';
import Control from './enums/Control';
import InstructionalButton from './modules/InstructionalButton';
import Scaleform from './utils/Scaleform';

let menuPool: NativeUI[] = [];

export default class NativeUI {
    private _visible: boolean = true;
    private _buttonsEnabled: boolean = true;
    private _justOpened: boolean = true;
    private _justOpenedFromPool: boolean = false;
    private _justClosedFromPool: boolean = false;
    private _poolOpening: NativeUI = null;

    private readonly _instructionalButtons: InstructionalButton[] = [];
    private readonly _instructionalButtonsScaleform: Scaleform;

    public readonly SelectTextLocalized: string = alt.getGxtText("HUD_INPUT2");
    public readonly BackTextLocalized: string = alt.getGxtText("HUD_INPUT3");

    public WidthOffset: number = 0;
    public ParentMenu: NativeUI = null;
    public Children: Map<string, NativeUI>; // (UUIDV4, NativeUI)
    public MouseControlsEnabled: boolean = false;
    public CloseableByUser: boolean = true;

    public get Visible() {
        return this._visible;
    }
    public set Visible(toggle: boolean) { // Menu pools don't work with submenus
        this._visible = toggle;
        this.UpdateScaleform();
		/*if(!toggle) {
			alt.emit('server:clientDebug', `Visible = false. _justOpenedFromPool: ${this._justOpenedFromPool}`);
		}*/
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
                    //alt.emit('server:clientDebug', 'Adding to menu pool ' + menuPool.length);
                    if (previousMenu !== this._poolOpening && previousMenu !== null) {
                        previousMenu._justClosedFromPool = true;
                        previousMenu.Visible = false;
                        //alt.emit('server:clientDebug', 'Closing current');
                    }
                }
            }
        } else {
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
                    //alt.emit('server:clientDebug', 'Removing from menu pool ' + menuPool.length);
                }
                if (menuPool.length) {
                    this._poolOpening = menuPool[menuPool.length - 1];
                    menuPool[menuPool.length - 1].Visible = true;
                    //alt.emit('server:clientDebug', 'Pool opening next in line menu');
                }
            }
            if (menuPool.length === 0) {
                game.setMouseCursorSprite(1);
            }
        }
    }

    constructor() {
        this._instructionalButtonsScaleform = new Scaleform("instructional_buttons");
        this.UpdateScaleform();
        
        this._visible = false;

        alt.everyTick(this.render.bind(this));
        //alt.log(`Created Native UI! ${this.title}`);
    }

    public DisableInstructionalButtons(disable: boolean) {
        this._buttonsEnabled = !disable;
    }

    public AddInstructionalButton(button: InstructionalButton): void {
        this._instructionalButtons.push(button);
    }

    public RemoveInstructionalButton(button: InstructionalButton): void {
        for (let i = 0; i < this._instructionalButtons.length; i++) {
            if (this._instructionalButtons[i] === button) {
                this._instructionalButtons.splice(i, 1);
            }
        }
    }

    public Open() {
        this.Visible = true;
    }

    private CleanUp(closeChildren: boolean = false) {
        if (closeChildren) {
            this.Children.forEach(m => {
                m.Close(true);
            });
        }
    }

    public Close(closeChildren: boolean = false) {
        this.Visible = false;
        this.CleanUp(closeChildren);
    }

    public ProcessControl() {
        if (!this.Visible)
            return;
        if (this._justOpened) {
            this._justOpened = false;
            return;
        }
    }


    public UpdateScaleform() {
        if (!this.Visible || !this._buttonsEnabled)
            return;
        this._instructionalButtonsScaleform.callFunction("CLEAR_ALL");
        this._instructionalButtonsScaleform.callFunction("TOGGLE_MOUSE_BUTTONS", 0 as number);
        this._instructionalButtonsScaleform.callFunction("CREATE_CONTAINER");

        this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", 0 as number, game.getControlInstructionalButton(2, Control.PhoneSelect as number, false) as string, this.SelectTextLocalized as string);
        this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", 1 as number, game.getControlInstructionalButton(2, Control.PhoneCancel as number, false) as string, this.BackTextLocalized as string);

        let count: number = 2;
        this._instructionalButtons.forEach((button) => {
            this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", count as number, button.GetButtonId() as string, button.Text as string);
            count++;
        });

        this._instructionalButtonsScaleform.callFunction("DRAW_INSTRUCTIONAL_BUTTONS", -1 as number);
    }

    private render() {
        if (!this.Visible)
            return;

        if (this._buttonsEnabled) {
            game.drawScaleformMovieFullscreen(this._instructionalButtonsScaleform.handle, 255, 255, 255, 255, 0);
            game.hideHudComponentThisFrame(6); // Vehicle Name
            game.hideHudComponentThisFrame(7); // Area Name
            game.hideHudComponentThisFrame(9); // Street Name
        }

        this.ProcessControl();

        let count = 0;
    }
}

export {
    NativeUI as Menu,
    Control,
    InstructionalButton,
}