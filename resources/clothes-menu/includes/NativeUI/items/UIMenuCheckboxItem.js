"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sprite_1 = require("../modules/Sprite");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const UIMenuItem_1 = require("./UIMenuItem");
class UIMenuCheckboxItem extends UIMenuItem_1.default {
    constructor(text, check = false, description = "") {
        super(text, description);
        this.Checked = false;
        const y = 0;
        this._checkedSprite = new Sprite_1.default("commonmenu", "shop_box_blank", new Point_1.default(410, y + 95), new Size_1.default(50, 50));
        this.Checked = check;
    }
    SetVerticalPosition(y) {
        super.SetVerticalPosition(y);
        this._checkedSprite.Pos = new Point_1.default(380 + this.Offset.X + this.Parent.WidthOffset, y + 138 + this.Offset.Y);
    }
    Draw() {
        super.Draw();
        this._checkedSprite.Pos = this._checkedSprite.Pos = new Point_1.default(380 + this.Offset.X + this.Parent.WidthOffset, this._checkedSprite.Pos.Y);
        const isDefaultHightlitedForeColor = this.HighlightedForeColor == UIMenuItem_1.default.DefaultHighlightedForeColor;
        if (this.Selected && isDefaultHightlitedForeColor) {
            this._checkedSprite.TextureName = this.Checked
                ? "shop_box_tickb"
                : "shop_box_blankb";
        }
        else {
            this._checkedSprite.TextureName = this.Checked
                ? "shop_box_tick"
                : "shop_box_blank";
        }
        this._checkedSprite.Color = this.Enabled
            ? this.Selected && !isDefaultHightlitedForeColor
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._checkedSprite.Draw();
    }
    SetRightBadge(badge) {
        return this;
    }
    SetRightLabel(text) {
        return this;
    }
}
exports.default = UIMenuCheckboxItem;
//# sourceMappingURL=UIMenuCheckboxItem.js.map