"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = require("natives");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const IElement_1 = require("./IElement");
class Rectangle extends IElement_1.default {
    constructor(pos, size, color) {
        super();
        this.Enabled = true;
        this.Pos = pos;
        this.Size = size;
        this.Color = color;
    }
    Draw(pos, size, color) {
        if (!pos)
            pos = new Size_1.default(0, 0);
        if (!size && !color) {
            pos = new Point_1.default(this.Pos.X + pos.Width, this.Pos.Y + pos.Height);
            size = this.Size;
            color = this.Color;
        }
        const w = size.Width / 1280.0;
        const h = size.Height / 720.0;
        const x = pos.X / 1280.0 + w * 0.5;
        const y = pos.Y / 720.0 + h * 0.5;
        natives_1.default.drawRect(x, y, w, h, color.R, color.G, color.B, color.A, false);
    }
}
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map