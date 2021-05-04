"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = require("natives");
const Size_1 = require("../utils/Size");
const Rectangle_1 = require("./Rectangle");
const Screen_1 = require("../utils/Screen");
class Container extends Rectangle_1.default {
    constructor(pos, size, color) {
        super(pos, size, color);
        this.Items = [];
    }
    addItem(item) {
        this.Items.push(item);
    }
    Draw(offset) {
        if (!this.Enabled)
            return;
        offset = offset || new Size_1.default();
        const screenw = Screen_1.default.Width;
        const screenh = Screen_1.default.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const w = this.Size.Width / width;
        const h = this.Size.Height / height;
        const x = (this.Pos.X + offset.Width) / width + w * 0.5;
        const y = (this.Pos.Y + offset.Height) / height + h * 0.5;
        natives_1.default.drawRect(x, y, w, h, this.Color.R, this.Color.G, this.Color.B, this.Color.A, false);
        for (var item of this.Items)
            item.Draw(new Size_1.default(this.Pos.X + offset.Width, this.Pos.Y + offset.Height));
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map