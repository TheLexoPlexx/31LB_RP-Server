"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alt = require("alt");
const Font_1 = require("../enums/Font");
const Alignment_1 = require("../enums/Alignment");
const ResText_1 = require("../modules/ResText");
const Sprite_1 = require("../modules/Sprite");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const Screen_1 = require("../utils/Screen");
const UIMenuItem_1 = require("./UIMenuItem");
class UIMenuDynamicListItem extends UIMenuItem_1.default {
    constructor(text, selectionChangeHandler, description = "", selectedStartValueHandler = null, data = null) {
        super(text, description, data);
        this._currentOffset = 0;
        this._precaptionText = '';
        this._selectedStartValueHandler = null;
        this.SelectionChangeHandler = null;
        if (!this.isVariableFunction(selectionChangeHandler)) {
            alt.logError(`[UIMenuDynamicListItem] ${text} is not created with a valid selectionChangeHandler, needs to be function. Please see docs.`);
        }
        if (!this.isVariableFunction(selectedStartValueHandler)) {
            alt.logError(`[UIMenuDynamicListItem] ${text} is not created with a valid selectedStartValueHandler, needs to be function. Please see docs.`);
        }
        this.SelectionChangeHandler = selectionChangeHandler;
        this._selectedStartValueHandler = selectedStartValueHandler;
        let y = 0;
        this._arrowLeft = new Sprite_1.default("commonmenu", "arrowleft", new Point_1.default(110, 105 + y), new Size_1.default(30, 30));
        this._arrowRight = new Sprite_1.default("commonmenu", "arrowright", new Point_1.default(280, 105 + y), new Size_1.default(30, 30));
        this._itemText = new ResText_1.default("", new Point_1.default(290, y + 104), 0.35, Color_1.default.White, Font_1.default.ChaletLondon, Alignment_1.default.Right);
    }
    SelectionChangeHandlerPromise(item, selectedValue, changeDirection) {
        return new Promise((resolve, reject) => {
            let newSelectedValue = this.SelectionChangeHandler(item, selectedValue, changeDirection);
            resolve(newSelectedValue);
        });
    }
    get PreCaptionText() {
        return this._precaptionText;
    }
    set PreCaptionText(text) {
        if (!text)
            throw new Error("The pre caption text can't be null");
        if (typeof text !== 'string')
            throw new Error("The pre caption text must be a string");
        this._precaptionText = text;
        this._currentOffset = Screen_1.default.GetTextWidth(this.PreCaptionText + this._selectedValue, this._itemText && this._itemText.Font ? this._itemText.Font : 0, 0.35);
    }
    get SelectedValue() {
        return this._selectedValue;
    }
    set SelectedValue(value) {
        this._selectedValue = value;
        if (value == undefined)
            return;
        this._currentOffset = Screen_1.default.GetTextWidth(this.PreCaptionText + this._selectedValue, this._itemText && this._itemText.Font ? this._itemText.Font : 0, this._itemText && this._itemText.Scale ? this._itemText.Scale : 0.35);
    }
    SetVerticalPosition(y) {
        this._arrowLeft.Pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._arrowRight.Pos = new Point_1.default(400 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._itemText.Pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, y + 147 + this.Offset.Y);
        super.SetVerticalPosition(y);
    }
    SetRightLabel(text) {
        return this;
    }
    SetRightBadge(badge) {
        return this;
    }
    Draw() {
        super.Draw();
        if (this._selectedValue == undefined) {
            if (this._selectedStartValueHandler != null) {
                this.SelectedValue = this._selectedStartValueHandler();
            }
            else {
                this._selectedValue = "";
            }
        }
        const offset = this._currentOffset;
        this._itemText.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._itemText.Caption = this.PreCaptionText + this._selectedValue;
        this._arrowLeft.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._arrowRight.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._arrowLeft.Pos = new Point_1.default(380 - offset + this.Offset.X + this.Parent.WidthOffset, this._arrowLeft.Pos.Y);
        if (this.Selected) {
            this._arrowLeft.Draw();
            this._arrowRight.Draw();
            this._itemText.Pos = new Point_1.default(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.Pos.Y);
        }
        else {
            this._itemText.Pos = new Point_1.default(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.Pos.Y);
        }
        this._itemText.Draw();
    }
    isVariableFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}
exports.default = UIMenuDynamicListItem;
//# sourceMappingURL=UIMenuDynamicListItem.js.map