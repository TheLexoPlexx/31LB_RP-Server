"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UUIDV4_1 = require("../utils/UUIDV4");
class ListItem {
    constructor(text = "", data = null) {
        this.Id = UUIDV4_1.default();
        this.DisplayText = text;
        this.Data = data;
    }
}
exports.default = ListItem;
//# sourceMappingURL=ListItem.js.map