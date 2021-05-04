"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListItem_1 = require("../modules/ListItem");
class ItemsCollection {
    constructor(items) {
        if (items.length === 0)
            throw new Error("ItemsCollection cannot be empty");
        this.items = items;
    }
    length() {
        return this.items.length;
    }
    getListItems() {
        const items = [];
        for (const item of this.items) {
            if (item instanceof ListItem_1.default) {
                items.push(item);
            }
            else if (typeof item == "string") {
                items.push(new ListItem_1.default(item));
            }
            else if (typeof item == "number") {
                items.push(new ListItem_1.default(item.toString()));
            }
        }
        return items;
    }
}
exports.default = ItemsCollection;
//# sourceMappingURL=ItemsCollection.js.map