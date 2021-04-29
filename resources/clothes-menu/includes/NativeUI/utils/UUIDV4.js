"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function UUIDV4() {
    let uuid = "";
    let ii;
    for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
            case 8:
            case 20:
                uuid += "-";
                uuid += ((Math.random() * 16) | 0).toString(16);
                break;
            case 12:
                uuid += "-";
                uuid += "4";
                break;
            case 16:
                uuid += "-";
                uuid += ((Math.random() * 4) | 8).toString(16);
                break;
            default:
                uuid += ((Math.random() * 16) | 0).toString(16);
        }
    }
    return uuid;
}
exports.default = UUIDV4;
//# sourceMappingURL=UUIDV4.js.map