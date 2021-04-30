"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alt = require("alt");
const BadgeStyle_1 = require("../enums/BadgeStyle");
const Font_1 = require("../enums/Font");
const Alignment_1 = require("../enums/Alignment");
const ResRectangle_1 = require("../modules/ResRectangle");
const ResText_1 = require("../modules/ResText");
const Sprite_1 = require("../modules/Sprite");
const Color_1 = require("../utils/Color");
const Point_1 = require("../utils/Point");
const Size_1 = require("../utils/Size");
const UUIDV4_1 = require("../utils/UUIDV4");
class UIMenuItem {
    constructor(text, description = "", data = null) {
        this.Id = UUIDV4_1.default();
        this.BackColor = UIMenuItem.DefaultBackColor;
        this.HighlightedBackColor = UIMenuItem.DefaultHighlightedBackColor;
        this.ForeColor = UIMenuItem.DefaultForeColor;
        this.HighlightedForeColor = UIMenuItem.DefaultHighlightedForeColor;
        this.RightLabel = "";
        this.LeftBadge = BadgeStyle_1.default.None;
        this.RightBadge = BadgeStyle_1.default.None;
        this.Enabled = true;
        this.Data = data;
        this._rectangle = new ResRectangle_1.default(new Point_1.default(0, 0), new Size_1.default(431, 38), new Color_1.default(150, 0, 0, 0));
        this._text = new ResText_1.default(text, new Point_1.default(8, 0), 0.33, Color_1.default.WhiteSmoke, Font_1.default.ChaletLondon, Alignment_1.default.Left);
        this.Description = description;
        this._selectedSprite = new Sprite_1.default("commonmenu", "gradient_nav", new Point_1.default(0, 0), new Size_1.default(431, 38));
        this._badgeLeft = new Sprite_1.default("commonmenu", "", new Point_1.default(0, 0), new Size_1.default(40, 40));
        this._badgeRight = new Sprite_1.default("commonmenu", "", new Point_1.default(0, 0), new Size_1.default(40, 40));
        this._labelText = new ResText_1.default("", new Point_1.default(0, 0), 0.35, Color_1.default.White, 0, Alignment_1.default.Right);
    }
    get Text() {
        return this._text.Caption;
    }
    set Text(text) {
        this._text.Caption = text;
    }
    get Description() {
        return this._description;
    }
    set Description(text) {
        this._description = text;
        if (this.hasOwnProperty('Parent')) {
            this.Parent.UpdateDescriptionCaption();
        }
    }
    SetVerticalPosition(y) {
        this._rectangle.Pos = new Point_1.default(this.Offset.X, y + 144 + this.Offset.Y);
        this._selectedSprite.Pos = new Point_1.default(0 + this.Offset.X, y + 144 + this.Offset.Y);
        this._text.Pos = new Point_1.default(8 + this.Offset.X, y + 147 + this.Offset.Y);
        this._badgeLeft.Pos = new Point_1.default(0 + this.Offset.X, y + 142 + this.Offset.Y);
        this._badgeRight.Pos = new Point_1.default(385 + this.Offset.X, y + 142 + this.Offset.Y);
        this._labelText.Pos = new Point_1.default(420 + this.Offset.X, y + 148 + this.Offset.Y);
    }
    addEvent(event, ...args) {
        this._event = { event: event, args: args };
    }
    fireEvent() {
        if (this._event) {
            alt.emit(this._event.event, ...this._event.args);
        }
    }
    Draw() {
        this._rectangle.Size = new Size_1.default(431 + this.Parent.WidthOffset, 38);
        this._selectedSprite.Size = new Size_1.default(431 + this.Parent.WidthOffset, 38);
        if (this.Hovered && !this.Selected) {
            this._rectangle.Color = new Color_1.default(255, 255, 255, 20);
            this._rectangle.Draw();
        }
        this._selectedSprite.Color = this.Selected
            ? this.HighlightedBackColor
            : this.BackColor;
        this._selectedSprite.Draw();
        this._text.Color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        if (this.LeftBadge != BadgeStyle_1.default.None) {
            this._text.Pos = new Point_1.default(35 + this.Offset.X, this._text.Pos.Y);
            this._badgeLeft.TextureDict = this.BadgeToSpriteLib(this.LeftBadge);
            this._badgeLeft.TextureName = this.BadgeToSpriteName(this.LeftBadge, this.Selected);
            this._badgeLeft.Color = this.IsBagdeWhiteSprite(this.LeftBadge)
                ? this.Enabled
                    ? this.Selected
                        ? this.HighlightedForeColor
                        : this.ForeColor
                    : new Color_1.default(163, 159, 148)
                : Color_1.default.White;
            this._badgeLeft.Draw();
        }
        else {
            this._text.Pos = new Point_1.default(8 + this.Offset.X, this._text.Pos.Y);
        }
        if (this.RightBadge != BadgeStyle_1.default.None) {
            this._badgeRight.Pos = new Point_1.default(385 + this.Offset.X + this.Parent.WidthOffset, this._badgeRight.Pos.Y);
            this._badgeRight.TextureDict = this.BadgeToSpriteLib(this.RightBadge);
            this._badgeRight.TextureName = this.BadgeToSpriteName(this.RightBadge, this.Selected);
            this._badgeRight.Color = this.IsBagdeWhiteSprite(this.RightBadge)
                ? this.Enabled
                    ? this.Selected
                        ? this.HighlightedForeColor
                        : this.ForeColor
                    : new Color_1.default(163, 159, 148)
                : Color_1.default.White;
            this._badgeRight.Draw();
        }
        if (this.RightLabel && this.RightLabel !== "") {
            this._labelText.Pos = new Point_1.default(420 + this.Offset.X + this.Parent.WidthOffset, this._labelText.Pos.Y);
            this._labelText.Caption = this.RightLabel;
            this._labelText.Color = this._text.Color = this.Enabled
                ? this.Selected
                    ? this.HighlightedForeColor
                    : this.ForeColor
                : new Color_1.default(163, 159, 148);
            this._labelText.Draw();
        }
        this._text.Draw();
    }
    SetLeftBadge(badge) {
        this.LeftBadge = badge;
    }
    SetRightBadge(badge) {
        this.RightBadge = badge;
    }
    SetRightLabel(text) {
        this.RightLabel = text;
    }
    BadgeToSpriteLib(badge) {
        switch (badge) {
            case BadgeStyle_1.default.Sale:
                return "mpshopsale";
            case BadgeStyle_1.default.Audio1:
            case BadgeStyle_1.default.Audio2:
            case BadgeStyle_1.default.Audio3:
            case BadgeStyle_1.default.AudioInactive:
            case BadgeStyle_1.default.AudioMute:
                return "mpleaderboard";
            default:
                return "commonmenu";
        }
    }
    BadgeToSpriteName(badge, selected) {
        switch (badge) {
            case BadgeStyle_1.default.None:
                return "";
            case BadgeStyle_1.default.BronzeMedal:
                return "mp_medal_bronze";
            case BadgeStyle_1.default.GoldMedal:
                return "mp_medal_gold";
            case BadgeStyle_1.default.SilverMedal:
                return "medal_silver";
            case BadgeStyle_1.default.Alert:
                return "mp_alerttriangle";
            case BadgeStyle_1.default.Crown:
                return "mp_hostcrown";
            case BadgeStyle_1.default.Ammo:
                return selected ? "shop_ammo_icon_b" : "shop_ammo_icon_a";
            case BadgeStyle_1.default.Armour:
                return selected ? "shop_armour_icon_b" : "shop_armour_icon_a";
            case BadgeStyle_1.default.Barber:
                return selected ? "shop_barber_icon_b" : "shop_barber_icon_a";
            case BadgeStyle_1.default.Clothes:
                return selected ? "shop_clothing_icon_b" : "shop_clothing_icon_a";
            case BadgeStyle_1.default.Franklin:
                return selected ? "shop_franklin_icon_b" : "shop_franklin_icon_a";
            case BadgeStyle_1.default.Bike:
                return selected ? "shop_garage_bike_icon_b" : "shop_garage_bike_icon_a";
            case BadgeStyle_1.default.Car:
                return selected ? "shop_garage_icon_b" : "shop_garage_icon_a";
            case BadgeStyle_1.default.Gun:
                return selected ? "shop_gunclub_icon_b" : "shop_gunclub_icon_a";
            case BadgeStyle_1.default.Heart:
                return selected ? "shop_health_icon_b" : "shop_health_icon_a";
            case BadgeStyle_1.default.Lock:
                return "shop_lock";
            case BadgeStyle_1.default.Makeup:
                return selected ? "shop_makeup_icon_b" : "shop_makeup_icon_a";
            case BadgeStyle_1.default.Mask:
                return selected ? "shop_mask_icon_b" : "shop_mask_icon_a";
            case BadgeStyle_1.default.Michael:
                return selected ? "shop_michael_icon_b" : "shop_michael_icon_a";
            case BadgeStyle_1.default.Star:
                return "shop_new_star";
            case BadgeStyle_1.default.Tatoo:
                return selected ? "shop_tattoos_icon_b" : "shop_tattoos_icon_";
            case BadgeStyle_1.default.Tick:
                return "shop_tick_icon";
            case BadgeStyle_1.default.Trevor:
                return selected ? "shop_trevor_icon_b" : "shop_trevor_icon_a";
            case BadgeStyle_1.default.Sale:
                return "saleicon";
            case BadgeStyle_1.default.ArrowLeft:
                return "arrowleft";
            case BadgeStyle_1.default.ArrowRight:
                return "arrowright";
            case BadgeStyle_1.default.Audio1:
                return "leaderboard_audio_1";
            case BadgeStyle_1.default.Audio2:
                return "leaderboard_audio_2";
            case BadgeStyle_1.default.Audio3:
                return "leaderboard_audio_3";
            case BadgeStyle_1.default.AudioInactive:
                return "leaderboard_audio_inactive";
            case BadgeStyle_1.default.AudioMute:
                return "leaderboard_audio_mute";
            default:
                return "";
        }
    }
    IsBagdeWhiteSprite(badge) {
        switch (badge) {
            case BadgeStyle_1.default.Lock:
            case BadgeStyle_1.default.Tick:
            case BadgeStyle_1.default.Crown:
                return true;
            default:
                return false;
        }
    }
    BadgeToColor(badge, selected) {
        switch (badge) {
            case BadgeStyle_1.default.Lock:
            case BadgeStyle_1.default.Tick:
            case BadgeStyle_1.default.Crown:
                return selected
                    ? new Color_1.default(255, 0, 0, 0)
                    : new Color_1.default(255, 255, 255, 255);
            default:
                return new Color_1.default(255, 255, 255, 255);
        }
    }
}
exports.default = UIMenuItem;
UIMenuItem.DefaultBackColor = Color_1.default.Empty;
UIMenuItem.DefaultHighlightedBackColor = Color_1.default.White;
UIMenuItem.DefaultForeColor = Color_1.default.WhiteSmoke;
UIMenuItem.DefaultHighlightedForeColor = Color_1.default.Black;
//# sourceMappingURL=UIMenuItem.js.map