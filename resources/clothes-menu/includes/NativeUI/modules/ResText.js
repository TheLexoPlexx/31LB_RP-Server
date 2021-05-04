"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alt = require("alt");
const Alignment_1 = require("../enums/Alignment");
const natives_1 = require("natives");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const Text_1 = require("./Text");
const Screen_1 = require("../utils/Screen");
class ResText extends Text_1.default {
    constructor(caption, pos, scale, color, font, centered) {
        super(caption, pos, scale, color || new Color_1.default(255, 255, 255), font || 0, false);
        this.TextAlignment = Alignment_1.default.Left;
        this.Wrap = 0;
        if (centered)
            this.TextAlignment = centered;
    }
    get WordWrap() {
        return new Size_1.default(this.Wrap, 0);
    }
    set WordWrap(value) {
        this.Wrap = value.Width;
    }
    Draw(arg1, pos, scale, color, font, arg2, dropShadow, outline, wordWrap) {
        let caption = arg1;
        let centered = arg2;
        let textAlignment = arg2;
        if (!arg1)
            arg1 = new Size_1.default(0, 0);
        if (arg1 && !pos) {
            textAlignment = this.TextAlignment;
            caption = this.Caption;
            pos = new Point_1.default(this.Pos.X + arg1.Width, this.Pos.Y + arg1.Height);
            scale = this.Scale;
            color = this.Color;
            font = this.Font;
            if (centered == true || centered == false) {
                centered = this.Centered;
            }
            else {
                centered = undefined;
                dropShadow = this.DropShadow;
                outline = this.Outline;
                wordWrap = this.WordWrap;
            }
        }
        const screenw = Screen_1.default.Width;
        const screenh = Screen_1.default.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        const width = height * ratio;
        const x = this.Pos.X / width;
        const y = this.Pos.Y / height;
        natives_1.default.setTextFont(parseInt(font));
        natives_1.default.setTextScale(1.0, scale);
        natives_1.default.setTextColour(color.R, color.G, color.B, color.A);
        if (centered !== undefined) {
            natives_1.default.setTextCentre(centered);
        }
        else {
            if (dropShadow)
                natives_1.default.setTextDropshadow(2, 0, 0, 0, 0);
            if (outline)
                alt.logWarning("[NativeUI] ResText outline not working!");
            switch (textAlignment) {
                case Alignment_1.default.Centered:
                    natives_1.default.setTextCentre(true);
                    break;
                case Alignment_1.default.Right:
                    natives_1.default.setTextRightJustify(true);
                    natives_1.default.setTextWrap(0.0, x);
                    break;
            }
            if (this.Wrap) {
                const xsize = (this.Pos.X + this.Wrap) / width;
                natives_1.default.setTextWrap(x, xsize);
            }
        }
        natives_1.default.beginTextCommandDisplayText("CELL_EMAIL_BCON");
        Text_1.default.AddLongString(caption);
        natives_1.default.endTextCommandDisplayText(x, y, 0);
    }
}
exports.default = ResText;
//# sourceMappingURL=ResText.js.map