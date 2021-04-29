"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natives_1 = require("natives");
class Common {
    static PlaySound(audioName, audioRef) {
        natives_1.default.playSound(-1, audioName, audioRef, false, 0, true);
    }
}
exports.default = Common;
//# sourceMappingURL=Common.js.map