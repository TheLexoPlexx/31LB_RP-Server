"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResRectangle_1 = require("../modules/ResRectangle");
const Sprite_1 = require("../modules/Sprite");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const UIMenuItem_1 = require("./UIMenuItem");
class UIMenuSliderItem extends UIMenuItem_1.default {
    constructor(text, items, index, description = "", divider = false, data = null) {
        super(text, description, data);
        const y = 0;
        this._items = items;
        this._arrowLeft = new Sprite_1.default("commonmenutu", "arrowleft", new Point_1.default(0, 105 + y), new Size_1.default(15, 15));
        this._arrowRight = new Sprite_1.default("commonmenutu", "arrowright", new Point_1.default(0, 105 + y), new Size_1.default(15, 15));
        this._rectangleBackground = new ResRectangle_1.default(new Point_1.default(0, 0), new Size_1.default(150, 9), new Color_1.default(4, 32, 57, 255));
        this._rectangleSlider = new ResRectangle_1.default(new Point_1.default(0, 0), new Size_1.default(75, 9), new Color_1.default(57, 116, 200, 255));
        if (divider) {
            this._rectangleDivider = new ResRectangle_1.default(new Point_1.default(0, 0), new Size_1.default(2.5, 20), Color_1.default.WhiteSmoke);
        }
        else {
            this._rectangleDivider = new ResRectangle_1.default(new Point_1.default(0, 0), new Size_1.default(2.5, 20), Color_1.default.Transparent);
        }
        this.Index = index;
    }
    get Index() {
        return this._index % this._items.length;
    }
    set Index(value) {
        this._index = 100000000 - (100000000 % this._items.length) + value;
    }
    SetVerticalPosition(y) {
        this._rectangleBackground.Pos = new Point_1.default(250 + this.Offset.X + this.Parent.WidthOffset, y + 158.5 + this.Offset.Y);
        this._rectangleSlider.Pos = new Point_1.default(250 + this.Offset.X + this.Parent.WidthOffset, y + 158.5 + this.Offset.Y);
        this._rectangleDivider.Pos = new Point_1.default(323.5 + this.Offset.X + this.Parent.WidthOffset, y + 153 + this.Offset.Y);
        this._arrowLeft.Pos = new Point_1.default(235 + this.Offset.X + this.Parent.WidthOffset, 155.5 + y + this.Offset.Y);
        this._arrowRight.Pos = new Point_1.default(400 + this.Offset.X + this.Parent.WidthOffset, 155.5 + y + this.Offset.Y);
        super.SetVerticalPosition(y);
    }
    IndexToItem(index) {
        return this._items[index];
    }
    Draw() {
        super.Draw();
        this._arrowLeft.Color = this.Enabled
            ? this.Selected
                ? Color_1.default.Black
                : Color_1.default.WhiteSmoke
            : new Color_1.default(163, 159, 148);
        this._arrowRight.Color = this.Enabled
            ? this.Selected
                ? Color_1.default.Black
                : Color_1.default.WhiteSmoke
            : new Color_1.default(163, 159, 148);
        let offset = ((this._rectangleBackground.Size.Width - this._rectangleSlider.Size.Width) / (this._items.length - 1)) * this.Index;
        this._rectangleSlider.Pos = new Point_1.default(250 + this.Offset.X + offset + +this.Parent.WidthOffset, this._rectangleSlider.Pos.Y);
        if (this.Selected) {
            this._arrowLeft.Draw();
            this._arrowRight.Draw();
        }
        this._rectangleBackground.Draw();
        this._rectangleSlider.Draw();
        this._rectangleDivider.Draw();
    }
    SetRightBadge(badge) { }
    SetRightLabel(text) { }
}
exports.default = UIMenuSliderItem;
//# sourceMappingURL=UIMenuSliderItem.js.map