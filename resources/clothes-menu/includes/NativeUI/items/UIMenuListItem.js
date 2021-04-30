"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Font_1 = require("../enums/Font");
const Alignment_1 = require("../enums/Alignment");
const ItemsCollection_1 = require("../modules/ItemsCollection");
const ListItem_1 = require("../modules/ListItem");
const ResText_1 = require("../modules/ResText");
const Sprite_1 = require("../modules/Sprite");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const Screen_1 = require("../utils/Screen");
const UIMenuItem_1 = require("./UIMenuItem");
class UIMenuListItem extends UIMenuItem_1.default {
    constructor(text, description = "", collection = new ItemsCollection_1.default([]), startIndex = 0, data = null) {
        super(text, description, data);
        this.ScrollingEnabled = true;
        this.HoldTimeBeforeScroll = 200;
        this._currentOffset = 0;
        this._itemsCollection = [];
        this._index = 0;
        let y = 0;
        this.Collection = collection.getListItems();
        this.Index = startIndex;
        this._arrowLeft = new Sprite_1.default("commonmenu", "arrowleft", new Point_1.default(110, 105 + y), new Size_1.default(30, 30));
        this._arrowRight = new Sprite_1.default("commonmenu", "arrowright", new Point_1.default(280, 105 + y), new Size_1.default(30, 30));
        this._itemText = new ResText_1.default("", new Point_1.default(290, y + 104), 0.35, Color_1.default.White, Font_1.default.ChaletLondon, Alignment_1.default.Right);
    }
    get Collection() {
        return this._itemsCollection;
    }
    set Collection(v) {
        if (!v)
            throw new Error("The collection can't be null");
        this._itemsCollection = v;
    }
    set SelectedItem(v) {
        const idx = this.Collection.findIndex(li => li.Id === v.Id);
        if (idx > 0)
            this.Index = idx;
        else
            this.Index = 0;
    }
    get SelectedItem() {
        return this.Collection.length > 0 ? this.Collection[this.Index] : null;
    }
    get SelectedValue() {
        return this.SelectedItem == null
            ? null
            : this.SelectedItem.Data == null
                ? this.SelectedItem.DisplayText
                : this.SelectedItem.Data;
    }
    get Index() {
        if (this.Collection == null)
            return -1;
        if (this.Collection != null && this.Collection.length == 0)
            return -1;
        return this._index % this.Collection.length;
    }
    set Index(value) {
        if (this.Collection == null)
            return;
        if (this.Collection != null && this.Collection.length == 0)
            return;
        this._index = 100000000 - (100000000 % this.Collection.length) + value;
        const caption = this.Collection.length >= this.Index
            ? this.Collection[this.Index].DisplayText
            : " ";
        this._currentOffset = Screen_1.default.GetTextWidth(caption, this._itemText && this._itemText.Font ? this._itemText.Font : 0, 0.35); // this._itemText && this._itemText.font ? this._itemText.font : 0, this._itemText && this._itemText.scale ? this._itemText.scale : 0.35
    }
    setCollection(collection) {
        this.Collection = collection.getListItems();
    }
    setCollectionItem(index, item, resetSelection = true) {
        if (index > this.Collection.length)
            // Placeholder for formatting
            throw new Error("Index out of bounds");
        if (typeof item === "string")
            // Placeholder for formatting
            item = new ListItem_1.default(item);
        this.Collection.splice(index, 1, item);
        if (resetSelection)
            // Placeholder for formatting
            this.Index = 0;
    }
    SetVerticalPosition(y) {
        this._arrowLeft.Pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._arrowRight.Pos = new Point_1.default(400 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._itemText.Pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, y + 147 + this.Offset.Y);
        super.SetVerticalPosition(y);
    }
    SetRightLabel(text) {
        return this;
    }
    SetRightBadge(badge) {
        return this;
    }
    Draw() {
        super.Draw();
        const caption = this.Collection.length >= this.Index
            ? this.Collection[this.Index].DisplayText
            : " ";
        const offset = this._currentOffset;
        this._itemText.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._itemText.Caption = caption;
        this._arrowLeft.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._arrowRight.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._arrowLeft.Pos = new Point_1.default(380 - offset + this.Offset.X + this.Parent.WidthOffset, this._arrowLeft.Pos.Y);
        if (this.Selected) {
            this._arrowLeft.Draw();
            this._arrowRight.Draw();
            this._itemText.Pos = new Point_1.default(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.Pos.Y);
        }
        else {
            this._itemText.Pos = new Point_1.default(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.Pos.Y);
        }
        this._itemText.Draw();
    }
}
exports.default = UIMenuListItem;
//# sourceMappingURL=UIMenuListItem.js.map