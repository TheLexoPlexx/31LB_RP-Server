"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = require("natives");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const Rectangle_1 = require("./Rectangle");
const Screen_1 = require("../utils/Screen");
class ResRectangle extends Rectangle_1.default {
    constructor(pos, size, color) {
        super(pos, size, color);
    }
    Draw(pos, size, color) {
        if (!pos)
            pos = new Size_1.default();
        if (pos && !size && !color) {
            pos = new Point_1.default(this.Pos.X + pos.Width, this.Pos.Y + pos.Height);
            size = this.Size;
            color = this.Color;
        }
        const screenw = Screen_1.default.Width;
        const screenh = Screen_1.default.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const w = size.Width / width;
        const h = size.Height / height;
        const x = pos.X / width + w * 0.5;
        const y = pos.Y / height + h * 0.5;
        natives_1.default.drawRect(x, y, w, h, color.R, color.G, color.B, color.A, false);
    }
}
exports.default = ResRectangle;
//# sourceMappingURL=ResRectangle.js.map