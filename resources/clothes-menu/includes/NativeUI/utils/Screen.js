"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alt = require("alt");
const natives_1 = require("natives");
const Size_1 = require("./Size");
const Text_1 = require("../modules/Text");
const gameScreen = natives_1.default.getActiveScreenResolution(0, 0);
class Screen {
    static get ResolutionMaintainRatio() {
        const ratio = Screen.Width / Screen.Height;
        const width = 1080.0 * ratio;
        return new Size_1.default(width, 1080.0);
    }
    static MousePosition(relative = false) {
        const res = Screen.ResolutionMaintainRatio;
        const cursor = alt.getCursorPos();
        let [mouseX, mouseY] = [cursor.x, cursor.y];
        if (relative)
            [mouseX, mouseY] = [cursor.x / res.Width, cursor.y / res.Height];
        return {
            X: mouseX,
            Y: mouseY
        };
    }
    static IsMouseInBounds(topLeft, boxSize) {
        const mousePosition = Screen.MousePosition();
        return (mousePosition.X >= topLeft.X &&
            mousePosition.X <= topLeft.X + boxSize.Width &&
            (mousePosition.Y > topLeft.Y && mousePosition.Y < topLeft.Y + boxSize.Height));
    }
    static GetTextWidth(text, font, scale) {
        // Start by requesting the game to start processing a width measurement
        natives_1.default.beginTextCommandGetWidth("CELL_EMAIL_BCON");
        // Add the text string
        Text_1.default.AddLongString(text);
        // Set the properties for the text
        natives_1.default.setTextFont(font);
        natives_1.default.setTextScale(1.0, scale);
        // Ask the game for the relative string width
        const width = natives_1.default.endTextCommandGetWidth(true);
        // And return the literal result
        const res = Screen.ResolutionMaintainRatio;
        return res.Width * width;
    }
    static GetLineCount(text, position, font, scale, wrap) {
        // Tell the game that we are going to request the number of lines
        natives_1.default.beginTextCommandLineCount("CELL_EMAIL_BCON");
        // Add the text that has been sent to us
        Text_1.default.AddLongString(text);
        // Get the resolution with the correct aspect ratio
        const res = Screen.ResolutionMaintainRatio;
        // Calculate the x and y positions
        const x = position.X / res.Width;
        const y = position.Y / res.Height;
        // Set the properties for the text
        natives_1.default.setTextFont(font);
        natives_1.default.setTextScale(1.0, scale);
        // If there is some text wrap to add
        if (wrap > 0) {
            // Calculate the wrap size
            const start = position.X / res.Width;
            const end = start + (wrap / res.Width);
            // And apply it
            natives_1.default.setTextWrap(x, end);
        }
        // Finally, return the number of lines being made by the string  
        let lineCount = natives_1.default.endTextCommandLineCount(x, y);
        return lineCount;
    }
}
exports.default = Screen;
Screen.Width = gameScreen[1];
Screen.Height = gameScreen[2];
//# sourceMappingURL=Screen.js.map