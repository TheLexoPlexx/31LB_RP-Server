"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Font_1 = require("../enums/Font");
const Alignment_1 = require("../enums/Alignment");
const ResText_1 = require("../modules/ResText");
const Sprite_1 = require("../modules/Sprite");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const Screen_1 = require("../utils/Screen");
const UIMenuItem_1 = require("./UIMenuItem");
class UIMenuAutoListItem extends UIMenuItem_1.default {
    constructor(text, description = "", lowerThreshold = 0, upperThreshold = 10, startValue = 0, data = null) {
        super(text, description, data);
        this._currentOffset = 0;
        this._leftMoveThreshold = 1;
        this._rightMoveThreshold = 1;
        this._lowerThreshold = 0;
        this._upperThreshold = 10;
        this._preCaptionText = '';
        this._postCaptionText = '';
        let y = 0;
        this.LowerThreshold = lowerThreshold;
        this.UpperThreshold = lowerThreshold > upperThreshold ? lowerThreshold : upperThreshold;
        this.SelectedValue = (startValue < lowerThreshold || startValue > upperThreshold) ? lowerThreshold : startValue;
        this._arrowLeft = new Sprite_1.default("commonmenu", "arrowleft", new Point_1.default(110, 105 + y), new Size_1.default(30, 30));
        this._arrowRight = new Sprite_1.default("commonmenu", "arrowright", new Point_1.default(280, 105 + y), new Size_1.default(30, 30));
        this._itemText = new ResText_1.default("", new Point_1.default(290, y + 104), 0.35, Color_1.default.White, Font_1.default.ChaletLondon, Alignment_1.default.Right);
    }
    get PreCaptionText() {
        return this._preCaptionText;
    }
    set PreCaptionText(text) {
        if (!text)
            throw new Error("The pre caption text can't be null");
        if (typeof text !== 'string')
            throw new Error("The pre caption text must be a string");
        this._preCaptionText = text;
        this._currentOffset = Screen_1.default.GetTextWidth(this.PreCaptionText + this._selectedValue.toString() + this.PostCaptionText, this._itemText && this._itemText.Font ? this._itemText.Font : 0, 0.35); // this._itemText && this._itemText.scale ? this._itemText.scale : 0.35
    }
    get PostCaptionText() {
        return this._postCaptionText;
    }
    set PostCaptionText(text) {
        if (!text)
            throw new Error("The post caption text can't be null");
        if (typeof text !== 'string')
            throw new Error("The post caption text must be a string");
        this._postCaptionText = text;
        this._currentOffset = Screen_1.default.GetTextWidth(this.PreCaptionText + this._selectedValue.toString() + this.PostCaptionText, this._itemText && this._itemText.Font ? this._itemText.Font : 0, 0.35); // this._itemText && this._itemText.scale ? this._itemText.scale : 0.35
    }
    get LeftMoveThreshold() {
        return this._leftMoveThreshold;
    }
    set LeftMoveThreshold(value) {
        if (!value)
            throw new Error("The left threshold can't be null");
        this._leftMoveThreshold = value;
    }
    get RightMoveThreshold() {
        return this._rightMoveThreshold;
    }
    set RightMoveThreshold(value) {
        if (!value)
            throw new Error("The right threshold can't be null");
        this._rightMoveThreshold = value;
    }
    get LowerThreshold() {
        return this._lowerThreshold;
    }
    set LowerThreshold(value) {
        if (typeof value !== 'number' && !value)
            throw new Error("The lower threshold can't be null");
        this._lowerThreshold = value;
        if (this.SelectedValue < value) {
            this.SelectedValue = value;
        }
    }
    get UpperThreshold() {
        return this._upperThreshold;
    }
    set UpperThreshold(value) {
        if (typeof value !== 'number' && !value)
            throw new Error("The upper threshold can't be null");
        this._upperThreshold = value;
        if (this.SelectedValue > value) {
            this.SelectedValue = value;
        }
    }
    get SelectedValue() {
        return this._selectedValue;
    }
    set SelectedValue(value) {
        if (value < this._lowerThreshold || value > this._upperThreshold)
            throw new Error("The value can not be outside the lower or upper limits");
        this._selectedValue = value;
        this._currentOffset = Screen_1.default.GetTextWidth(this.PreCaptionText + this._selectedValue.toString() + this.PostCaptionText, this._itemText && this._itemText.Font ? this._itemText.Font : 0, this._itemText && this._itemText.Scale ? this._itemText.Scale : 0.35);
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
        const offset = this._currentOffset;
        this._itemText.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._itemText.Caption = this.PreCaptionText + this._selectedValue + this.PostCaptionText;
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
}
exports.default = UIMenuAutoListItem;
//# sourceMappingURL=UIMenuAutoListItem.js.map