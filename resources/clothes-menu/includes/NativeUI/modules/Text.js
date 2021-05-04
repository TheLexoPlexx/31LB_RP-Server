"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const natives_1 = require("natives");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const IElement_1 = require("./IElement");
class Text extends IElement_1.default {
    constructor(caption, pos, scale, color, font, centered) {
        super();
        this.Caption = caption;
        this.Pos = pos;
        this.Scale = scale;
        this.Color = color || new Color_1.default(255, 255, 255, 255);
        this.Font = font || 0;
        this.Centered = centered || false;
    }
    Draw(caption, pos, scale, color, font, centered) {
        if (caption && !pos && !scale && !color && !font && !centered) {
            pos = new Point_1.default(this.Pos.X + caption.Width, this.Pos.Y + caption.Height);
            scale = this.Scale;
            color = this.Color;
            font = this.Font;
            centered = this.Centered;
        }
        const x = pos.X / 1280.0;
        const y = pos.Y / 720.0;
        natives_1.default.setTextFont(parseInt(font));
        natives_1.default.setTextScale(scale, scale);
        natives_1.default.setTextColour(color.R, color.G, color.B, color.A);
        natives_1.default.setTextCentre(centered);
        natives_1.default.beginTextCommandDisplayText("STRING");
        Text.AddLongString(caption);
        natives_1.default.endTextCommandDisplayText(x, y, 0);
    }
    static AddLongString(text) {
        if (!text.length)
            return;
        const maxStringLength = 99;
        for (let i = 0, position; i < text.length; i += maxStringLength) {
            let currentText = text.substr(i, i + maxStringLength);
            let currentIndex = i;
            if ((currentText.match(/~/g) || []).length % 2 !== 0) {
                position = currentText.lastIndexOf('~');
                //if(position > 0 && currentText[position - 1] === ' ') { // Doesn't the substring auto add a space?
                //	position--;
                //}
                i -= (maxStringLength - position);
            }
            else {
                position = Math.min(maxStringLength, text.length - currentIndex);
            }
            natives_1.default.addTextComponentSubstringPlayerName(text.substr(currentIndex, position));
        }
    }
}
exports.default = Text;
exports.Text = Text;
//# sourceMappingURL=Text.js.map