"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidsizedMessage = exports.BigMessage = exports.ListItem = exports.ItemsCollection = exports.Color = exports.Size = exports.Point = exports.InstructionalButton = exports.ResRectangle = exports.Sprite = exports.HudColor = exports.Control = exports.Alignment = exports.Font = exports.ChangeDirection = exports.BadgeStyle = exports.UIMenuSliderItem = exports.UIMenuCheckboxItem = exports.UIMenuDynamicListItem = exports.UIMenuAutoListItem = exports.UIMenuListItem = exports.UIMenuItem = exports.Menu = void 0;
const alt = require("alt");
const natives_1 = require("natives");
const BadgeStyle_1 = require("./enums/BadgeStyle");
exports.BadgeStyle = BadgeStyle_1.default;
const Font_1 = require("./enums/Font");
exports.Font = Font_1.default;
const Alignment_1 = require("./enums/Alignment");
exports.Alignment = Alignment_1.default;
const Control_1 = require("./enums/Control");
exports.Control = Control_1.default;
const HudColor_1 = require("./enums/HudColor");
exports.HudColor = HudColor_1.default;
const ChangeDirection_1 = require("./enums/ChangeDirection");
exports.ChangeDirection = ChangeDirection_1.default;
const UIMenuCheckboxItem_1 = require("./items/UIMenuCheckboxItem");
exports.UIMenuCheckboxItem = UIMenuCheckboxItem_1.default;
const UIMenuItem_1 = require("./items/UIMenuItem");
exports.UIMenuItem = UIMenuItem_1.default;
const UIMenuListItem_1 = require("./items/UIMenuListItem");
exports.UIMenuListItem = UIMenuListItem_1.default;
const UIMenuAutoListItem_1 = require("./items/UIMenuAutoListItem");
exports.UIMenuAutoListItem = UIMenuAutoListItem_1.default;
const UIMenuSliderItem_1 = require("./items/UIMenuSliderItem");
exports.UIMenuSliderItem = UIMenuSliderItem_1.default;
const Container_1 = require("./modules/Container");
const ItemsCollection_1 = require("./modules/ItemsCollection");
exports.ItemsCollection = ItemsCollection_1.default;
const ListItem_1 = require("./modules/ListItem");
exports.ListItem = ListItem_1.default;
const ResRectangle_1 = require("./modules/ResRectangle");
exports.ResRectangle = ResRectangle_1.default;
const ResText_1 = require("./modules/ResText");
const Sprite_1 = require("./modules/Sprite");
exports.Sprite = Sprite_1.default;
const Color_1 = require("./utils/Color");
exports.Color = Color_1.default;
const Common_1 = require("./utils/Common");
const LiteEvent_1 = require("./utils/LiteEvent");
const Point_1 = require("./utils/Point");
exports.Point = Point_1.default;
const Size_1 = require("./utils/Size");
exports.Size = Size_1.default;
const UUIDV4_1 = require("./utils/UUIDV4");
const Screen_1 = require("./utils/Screen");
const InstructionalButton_1 = require("./modules/InstructionalButton");
exports.InstructionalButton = InstructionalButton_1.default;
const Scaleform_1 = require("./utils/Scaleform");
const BigMessage_1 = require("./modules/BigMessage");
exports.BigMessage = BigMessage_1.default;
const MidsizedMessage_1 = require("./modules/MidsizedMessage");
exports.MidsizedMessage = MidsizedMessage_1.default;
const UIMenuDynamicListItem_1 = require("./items/UIMenuDynamicListItem");
exports.UIMenuDynamicListItem = UIMenuDynamicListItem_1.default;
let menuPool = [];
class NativeUI {
    constructor(title, subtitle, offset, spriteLibrary, spriteName) {
        this._visible = true;
        this._counterPretext = "";
        this._counterOverride = undefined;
        this._lastUpDownNavigation = 0;
        this._lastLeftRightNavigation = 0;
        this._extraOffset = 0;
        this._buttonsEnabled = true;
        this._justOpened = true;
        this._justOpenedFromPool = false;
        this._justClosedFromPool = false;
        this._poolOpening = null;
        this._safezoneOffset = new Point_1.default(0, 0);
        this._activeItem = 1000;
        this._maxItemsOnScreen = 9;
        this._maxItem = this._maxItemsOnScreen;
        this._mouseEdgeEnabled = true;
        this._bannerSprite = null;
        this._bannerRectangle = null;
        this._recalculateDescriptionNextFrame = 1;
        this._instructionalButtons = [];
        this._defaultTitleScale = 1.15;
        this._maxMenuItems = 1000;
        this.Id = UUIDV4_1.default();
        this.SelectTextLocalized = alt.getGxtText("HUD_INPUT2");
        this.BackTextLocalized = alt.getGxtText("HUD_INPUT3");
        this.WidthOffset = 0;
        this.ParentMenu = null;
        this.ParentItem = null;
        this.MouseControlsEnabled = false;
        this.CloseableByUser = true;
        this.AUDIO_LIBRARY = "HUD_FRONTEND_DEFAULT_SOUNDSET";
        this.AUDIO_UPDOWN = "NAV_UP_DOWN";
        this.AUDIO_LEFTRIGHT = "NAV_LEFT_RIGHT";
        this.AUDIO_SELECT = "SELECT";
        this.AUDIO_BACK = "BACK";
        this.AUDIO_ERROR = "ERROR";
        this.MenuItems = [];
        // Events
        this.IndexChange = new LiteEvent_1.default();
        this.ListChange = new LiteEvent_1.default();
        this.AutoListChange = new LiteEvent_1.default();
        this.DynamicListChange = new LiteEvent_1.default();
        this.SliderChange = new LiteEvent_1.default();
        //public readonly SliderSelect = new LiteEvent();
        this.CheckboxChange = new LiteEvent_1.default();
        this.ItemSelect = new LiteEvent_1.default();
        this.MenuOpen = new LiteEvent_1.default();
        this.MenuClose = new LiteEvent_1.default();
        this.MenuChange = new LiteEvent_1.default();
        if (!(offset instanceof Point_1.default))
            offset = Point_1.default.Parse(offset);
        this._spriteLibrary = spriteLibrary || "commonmenu";
        this._spriteName = spriteName || "interaction_bgd";
        this._offset = new Point_1.default(offset.X, offset.Y);
        this.Children = new Map();
        this._instructionalButtonsScaleform = new Scaleform_1.default("instructional_buttons");
        this.UpdateScaleform();
        // Create everything
        this._mainMenu = new Container_1.default(new Point_1.default(0, 0), new Size_1.default(700, 500), new Color_1.default(0, 0, 0, 0));
        this._bannerSprite = new Sprite_1.default(this._spriteLibrary, this._spriteName, new Point_1.default(0 + this._offset.X, 0 + this._offset.Y), new Size_1.default(431, 107));
        this._mainMenu.addItem((this._titleResText = new ResText_1.default(title, new Point_1.default(215 + this._offset.X, 20 + this._offset.Y), this._defaultTitleScale, new Color_1.default(255, 255, 255), 1, Alignment_1.default.Centered)));
        if (subtitle !== "") {
            this._mainMenu.addItem(new ResRectangle_1.default(new Point_1.default(0 + this._offset.X, 107 + this._offset.Y), new Size_1.default(431, 37), new Color_1.default(0, 0, 0, 255)));
            this._mainMenu.addItem((this._subtitleResText = new ResText_1.default(subtitle, new Point_1.default(8 + this._offset.X, 110 + this._offset.Y), 0.35, new Color_1.default(255, 255, 255), 0, Alignment_1.default.Left)));
            if (subtitle.startsWith("~")) {
                this._counterPretext = subtitle.substr(0, 3);
            }
            this._counterText = new ResText_1.default("", new Point_1.default(425 + this._offset.X, 110 + this._offset.Y), 0.35, new Color_1.default(255, 255, 255), 0, Alignment_1.default.Right);
            this._extraOffset += 37;
        }
        this._upAndDownSprite = new Sprite_1.default("commonmenu", "shop_arrows_upanddown", new Point_1.default(190 + this._offset.X, 147 + 37 * (this._maxItemsOnScreen + 1) + this._offset.Y - 37 + this._extraOffset), new Size_1.default(50, 50));
        this._extraRectangleUp = new ResRectangle_1.default(new Point_1.default(0 + this._offset.X, 144 + 38 * (this._maxItemsOnScreen + 1) + this._offset.Y - 37 + this._extraOffset), new Size_1.default(431, 18), new Color_1.default(0, 0, 0, 200));
        this._extraRectangleDown = new ResRectangle_1.default(new Point_1.default(0 + this._offset.X, 144 + 18 + 38 * (this._maxItemsOnScreen + 1) + this._offset.Y - 37 + this._extraOffset), new Size_1.default(431, 18), new Color_1.default(0, 0, 0, 200));
        this._descriptionBar = new ResRectangle_1.default(new Point_1.default(this._offset.X, 123), new Size_1.default(431, 4), Color_1.default.Black);
        this._descriptionRectangle = new Sprite_1.default("commonmenu", "gradient_bgd", new Point_1.default(this._offset.X, 127), new Size_1.default(431, 30));
        this._descriptionText = new ResText_1.default("", new Point_1.default(this._offset.X + 5, 125), 0.35, new Color_1.default(255, 255, 255, 255), Font_1.default.ChaletLondon, Alignment_1.default.Left);
        this._background = new Sprite_1.default("commonmenu", "gradient_bgd", new Point_1.default(this._offset.X, 144 + this._offset.Y - 37 + this._extraOffset), new Size_1.default(290, 25));
        this._visible = false;
        alt.everyTick(this.render.bind(this));
        //alt.log(`Created Native UI! ${this.title}`);
    }
    GetSpriteBanner() {
        return this._bannerSprite;
    }
    GetRectangleBanner() {
        return this._bannerRectangle;
    }
    GetTitle() {
        return this._titleResText;
    }
    get MaxItemsVisible() {
        return this._maxItemsOnScreen;
    }
    set MaxItemsVisible(value) {
        this._maxItemsOnScreen = value;
        this._maxItem = value;
    }
    get Title() {
        return this._titleResText.Caption;
    }
    set Title(text) {
        this._titleResText.Caption = text;
    }
    get GetSubTitle() {
        return this._titleResText;
    }
    get SubTitle() {
        return this._titleResText.Caption;
    }
    set SubTitle(text) {
        this._subtitleResText.Caption = text;
    }
    get Visible() {
        return this._visible;
    }
    set Visible(toggle) {
        this._visible = toggle;
        Common_1.default.PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.UpdateScaleform();
        /*if(!toggle) {
            alt.emit('server:clientDebug', `Visible = false. _justOpenedFromPool: ${this._justOpenedFromPool}`);
        }*/
        if (toggle) {
            this.UpdateDescriptionCaption();
        }
        if (this._justOpenedFromPool === true) {
            this._justOpenedFromPool = false;
            return;
        }
        if (toggle) {
            this._justOpened = true;
            this.MenuOpen.emit();
            if (this.ParentMenu === null) {
                if (!menuPool.includes(this) && this !== this._poolOpening) {
                    const previousMenu = (menuPool.length) ? menuPool[menuPool.length - 1] : null;
                    menuPool.push(this);
                    //alt.emit('server:clientDebug', 'Adding to menu pool ' + menuPool.length);
                    if (previousMenu !== this._poolOpening && previousMenu !== null) {
                        previousMenu._justClosedFromPool = true;
                        previousMenu.Visible = false;
                        //alt.emit('server:clientDebug', 'Closing current');
                    }
                }
            }
        }
        else {
            if (this._justClosedFromPool === true) {
                this._justClosedFromPool = false;
                return;
            }
            if (this.ParentMenu === null && menuPool.includes(this) && menuPool.length) {
                if (menuPool[menuPool.length - 1] === this) {
                    menuPool.pop();
                    this._justOpenedFromPool = true;
                    if (!menuPool.length) {
                        this._poolOpening = null;
                    }
                    //alt.emit('server:clientDebug', 'Removing from menu pool ' + menuPool.length);
                }
                if (menuPool.length) {
                    this._poolOpening = menuPool[menuPool.length - 1];
                    menuPool[menuPool.length - 1].Visible = true;
                    //alt.emit('server:clientDebug', 'Pool opening next in line menu');
                }
            }
            if (menuPool.length === 0) {
                natives_1.default.setMouseCursorSprite(1);
            }
        }
    }
    get CurrentSelection() {
        return this._activeItem % this.MenuItems.length;
    }
    set CurrentSelection(v) {
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem = this._maxMenuItems - (this._maxMenuItems % this.MenuItems.length) + v;
        if (this.CurrentSelection > this._maxItem) {
            this._maxItem = this.CurrentSelection;
            this._minItem = this.CurrentSelection - this._maxItemsOnScreen;
        }
        else if (this.CurrentSelection < this._minItem) {
            this._maxItem = this._maxItemsOnScreen + this.CurrentSelection;
            this._minItem = this.CurrentSelection;
        }
        this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]);
        this.UpdateDescriptionCaption();
    }
    DisableInstructionalButtons(disable) {
        this._buttonsEnabled = !disable;
    }
    AddInstructionalButton(button) {
        this._instructionalButtons.push(button);
    }
    SetSpriteBannerType(spriteBanner) {
        this._bannerRectangle = null;
        this.AddSpriteBannerType(spriteBanner);
    }
    SetRectangleBannerType(rectangle) {
        this._bannerSprite = null;
        this._bannerRectangle = rectangle;
        this._bannerRectangle.Pos = new Point_1.default(this._offset.X, this._offset.Y);
        this._bannerRectangle.Size = new Size_1.default(431 + this.WidthOffset, 107);
    }
    AddSpriteBannerType(spriteBanner) {
        this._bannerSprite = spriteBanner;
        this._bannerSprite.Size = new Size_1.default(431 + this.WidthOffset, 107);
        this._bannerSprite.Pos = new Point_1.default(this._offset.X, this._offset.Y);
    }
    SetNoBannerType() {
        this._bannerSprite = null;
        this._bannerRectangle = new ResRectangle_1.default(new Point_1.default(this._offset.X, this._offset.Y), new Size_1.default(431 + this.WidthOffset, 107), new Color_1.default(0, 0, 0, 0));
    }
    RemoveInstructionalButton(button) {
        for (let i = 0; i < this._instructionalButtons.length; i++) {
            if (this._instructionalButtons[i] === button) {
                this._instructionalButtons.splice(i, 1);
            }
        }
    }
    RecalculateDescriptionPosition() {
        const count = (this.MenuItems.length > this._maxItemsOnScreen + 1) ? this._maxItemsOnScreen + 2 : this.MenuItems.length;
        this._descriptionBar.Size = new Size_1.default(431 + this.WidthOffset, 4);
        this._descriptionRectangle.Size = new Size_1.default(431 + this.WidthOffset, 30);
        this._descriptionBar.Pos = new Point_1.default(this._offset.X, 149 - 37 + this._extraOffset + this._offset.Y);
        this._descriptionRectangle.Pos = new Point_1.default(this._offset.X, 149 - 37 + this._extraOffset + this._offset.Y);
        this._descriptionText.Pos = new Point_1.default(this._offset.X + 8, 155 - 37 + this._extraOffset + this._offset.Y);
        this._descriptionBar.Pos = new Point_1.default(this._offset.X, 38 * count + this._descriptionBar.Pos.Y);
        this._descriptionRectangle.Pos = new Point_1.default(this._offset.X, 38 * count + this._descriptionRectangle.Pos.Y);
        this._descriptionText.Pos = new Point_1.default(this._offset.X + 8, 38 * count + this._descriptionText.Pos.Y);
    }
    SetMenuWidthOffset(widthOffset) {
        this.WidthOffset = widthOffset;
        if (this._bannerSprite != null) {
            this._bannerSprite.Size = new Size_1.default(431 + this.WidthOffset, 107);
        }
        this._mainMenu.Items[0].pos = new Point_1.default((this.WidthOffset + this._offset.X + 431) / 2, 20 + this._offset.Y);
        if (this._counterText) {
            this._counterText.Pos = new Point_1.default(425 + this._offset.X + widthOffset, 110 + this._offset.Y);
        }
        if (this._mainMenu.Items.length >= 2) {
            const tmp = this._mainMenu.Items[1];
            tmp.size = new Size_1.default(431 + this.WidthOffset, 37);
        }
        if (this._bannerRectangle != null) {
            this._bannerRectangle.Size = new Size_1.default(431 + this.WidthOffset, 107);
        }
    }
    AddItem(item) {
        if (this._justOpened)
            this._justOpened = false;
        item.Offset = this._offset;
        item.Parent = this;
        item.SetVerticalPosition(this.MenuItems.length * 25 - 37 + this._extraOffset);
        this.MenuItems.push(item);
        this.RefreshIndex();
    }
    RemoveItem(item) {
        for (let i = 0; i < this.MenuItems.length; i++) {
            if (this.MenuItems[i] === item) {
                this.MenuItems.splice(i, 1);
            }
        }
        this.RefreshIndex();
    }
    RefreshIndex() {
        if (this.MenuItems.length == 0) {
            this._activeItem = this._maxMenuItems;
            this._maxItem = this._maxItemsOnScreen;
            this._minItem = 0;
            return;
        }
        for (let i = 0; i < this.MenuItems.length; i++)
            this.MenuItems[i].Selected = false;
        this._activeItem = this._maxMenuItems - (this._maxMenuItems % this.MenuItems.length);
        this._maxItem = this._maxItemsOnScreen;
        this._minItem = 0;
        if (this._visible) {
            this.UpdateDescriptionCaption();
        }
    }
    Clear() {
        this.MenuItems = [];
        this.RecalculateDescriptionPosition();
    }
    Open() {
        this.Visible = true;
    }
    CleanUp(closeChildren = false) {
        if (closeChildren) {
            this.Children.forEach(m => {
                m.Close(true);
            });
        }
        //Reset current selected value of dynamic list items so they are dynamically set next draw
        this.MenuItems.filter(menuItem => menuItem instanceof UIMenuDynamicListItem_1.default).forEach((menuItem) => {
            menuItem.SelectedValue = undefined;
        });
        this.RefreshIndex();
    }
    Close(closeChildren = false) {
        this.Visible = false;
        this.CleanUp(closeChildren);
        this.MenuClose.emit(true);
    }
    GoLeft() {
        if (!(this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1.default) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuAutoListItem_1.default) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuDynamicListItem_1.default) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1.default) ||
            !this.MenuItems[this.CurrentSelection].Enabled)
            return;
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            if (it.Collection.length == 0)
                return;
            it.Index--;
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.ListChange.emit(it, it.Index);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuAutoListItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            if (it.SelectedValue <= it.LowerThreshold) {
                it.SelectedValue = it.UpperThreshold;
            }
            else {
                it.SelectedValue -= it.LeftMoveThreshold;
            }
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.AutoListChange.emit(it, it.SelectedValue, ChangeDirection_1.default.Left);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuDynamicListItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            it.SelectionChangeHandlerPromise(it, it.SelectedValue, ChangeDirection_1.default.Left).then((newSelectedValue) => {
                it.SelectedValue = newSelectedValue;
                this.DynamicListChange.emit(it, it.SelectedValue, ChangeDirection_1.default.Left);
            });
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            it.Index = it.Index - 1;
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.SliderChange.emit(it, it.Index, it.IndexToItem(it.Index));
        }
    }
    GoRight() {
        if (!(this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1.default) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuAutoListItem_1.default) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuDynamicListItem_1.default) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1.default) ||
            !this.MenuItems[this.CurrentSelection].Enabled)
            return;
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            if (it.Collection.length == 0)
                return;
            it.Index++;
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.ListChange.emit(it, it.Index);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuAutoListItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            if (it.SelectedValue >= it.UpperThreshold) {
                it.SelectedValue = it.LowerThreshold;
            }
            else {
                it.SelectedValue += it.RightMoveThreshold;
            }
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.AutoListChange.emit(it, it.SelectedValue, ChangeDirection_1.default.Right);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuDynamicListItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            it.SelectionChangeHandlerPromise(it, it.SelectedValue, ChangeDirection_1.default.Right).then((newSelectedValue) => {
                it.SelectedValue = newSelectedValue;
                this.DynamicListChange.emit(it, it.SelectedValue, ChangeDirection_1.default.Right);
            });
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1.default) {
            const it = this.MenuItems[this.CurrentSelection];
            it.Index++;
            Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.SliderChange.emit(it, it.Index, it.IndexToItem(it.Index));
        }
    }
    SelectItem() {
        if (!this.MenuItems[this.CurrentSelection].Enabled) {
            Common_1.default.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
            return;
        }
        const it = this.MenuItems[this.CurrentSelection];
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuCheckboxItem_1.default) {
            it.Checked = !it.Checked;
            Common_1.default.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
            this.CheckboxChange.emit(it, it.Checked);
        }
        else {
            Common_1.default.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
            this.ItemSelect.emit(it, this.CurrentSelection);
            if (this.Children.has(it.Id)) {
                const subMenu = this.Children.get(it.Id);
                this.Visible = false;
                subMenu.Visible = true;
                this.MenuChange.emit(subMenu, true);
            }
        }
        it.fireEvent();
    }
    HasCurrentSelectionChildren() {
        const it = this.MenuItems[this.CurrentSelection];
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuItem_1.default) {
            if (this.Children.has(it.Id)) {
                return true;
            }
        }
        return false;
    }
    IsMouseInListItemArrows(item, topLeft, safezone) {
        natives_1.default.beginTextCommandGetWidth("jamyfafi");
        natives_1.default.addTextComponentSubstringPlayerName(item.Text);
        let res = Screen_1.default.ResolutionMaintainRatio;
        let screenw = res.Width;
        let screenh = res.Height;
        const height = 1080.0;
        const ratio = screenw / screenh;
        let width = height * ratio;
        const labelSize = natives_1.default.endTextCommandGetWidth(false) * width * 0.35;
        const labelSizeX = 5 + labelSize + 10;
        const arrowSizeX = 431 - labelSizeX;
        return Screen_1.default.IsMouseInBounds(topLeft, new Size_1.default(labelSizeX, 38))
            ? 1
            : Screen_1.default.IsMouseInBounds(new Point_1.default(topLeft.X + labelSizeX, topLeft.Y), new Size_1.default(arrowSizeX, 38))
                ? 2
                : 0;
    }
    ProcessMouse() {
        if (!this.Visible || this._justOpened || this.MenuItems.length == 0 || !this.MouseControlsEnabled) {
            this.MenuItems.filter(i => i.Hovered).forEach(i => (i.Hovered = false));
            return;
        }
        alt.showCursor(true);
        let limit = this.MenuItems.length - 1;
        let counter = 0;
        if (this.MenuItems.length > this._maxItemsOnScreen + 1)
            limit = this._maxItem;
        if (Screen_1.default.IsMouseInBounds(new Point_1.default(0, 0), new Size_1.default(30, 1080)) && this._mouseEdgeEnabled) {
            natives_1.default.setGameplayCamRelativeHeading(natives_1.default.getGameplayCamRelativeHeading() + 5.0);
            natives_1.default.setMouseCursorSprite(6);
        }
        else if (Screen_1.default.IsMouseInBounds(new Point_1.default(Screen_1.default.ResolutionMaintainRatio.Width - 30.0, 0), new Size_1.default(30, 1080)) && this._mouseEdgeEnabled) {
            natives_1.default.setGameplayCamRelativeHeading(natives_1.default.getGameplayCamRelativeHeading() - 5.0);
            natives_1.default.setMouseCursorSprite(7);
        }
        else if (this._mouseEdgeEnabled) {
            natives_1.default.setMouseCursorSprite(1);
        }
        for (let i = this._minItem; i <= limit; i++) {
            let xpos = this._offset.X;
            let ypos = this._offset.Y + 144 - 37 + this._extraOffset + counter * 38;
            let yposSelected = this._offset.Y + 144 - 37 + this._extraOffset + this._safezoneOffset.Y + this.CurrentSelection * 38;
            let xsize = 431 + this.WidthOffset;
            const ysize = 38;
            const uiMenuItem = this.MenuItems[i];
            if (Screen_1.default.IsMouseInBounds(new Point_1.default(xpos, ypos), new Size_1.default(xsize, ysize))) {
                uiMenuItem.Hovered = true;
                const res = this.IsMouseInListItemArrows(this.MenuItems[i], new Point_1.default(xpos, ypos), 0);
                if (uiMenuItem.Hovered && res == 1 && (this.MenuItems[i] instanceof UIMenuListItem_1.default || this.MenuItems[i] instanceof UIMenuAutoListItem_1.default || this.MenuItems[i] instanceof UIMenuDynamicListItem_1.default)) {
                    natives_1.default.setMouseCursorSprite(5);
                }
                if (natives_1.default.isControlJustReleased(0, 24) || natives_1.default.isDisabledControlJustReleased(0, 24))
                    if (uiMenuItem.Selected && uiMenuItem.Enabled) {
                        if ((this.MenuItems[i] instanceof UIMenuListItem_1.default || this.MenuItems[i] instanceof UIMenuAutoListItem_1.default || this.MenuItems[i] instanceof UIMenuDynamicListItem_1.default)
                            && this.IsMouseInListItemArrows(this.MenuItems[i], new Point_1.default(xpos, ypos), 0) > 0) {
                            switch (res) {
                                case 1:
                                    Common_1.default.PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
                                    //this.MenuItems[i].ItemActivate(this);
                                    this.MenuItems[i].fireEvent();
                                    this.ItemSelect.emit(this.MenuItems[i], i);
                                    break;
                                case 2:
                                    let it = this.MenuItems[i];
                                    if ((it.Collection == null ? it.Items.Count : it.Collection.Count) > 0) {
                                        it.Index++;
                                        Common_1.default.PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
                                        this.ListChange.emit(it, it.Index);
                                    }
                                    break;
                            }
                        }
                        else
                            this.SelectItem();
                    }
                    else if (!uiMenuItem.Selected) {
                        this.CurrentSelection = i;
                        Common_1.default.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
                        this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]);
                        this.SelectItem();
                        this.UpdateDescriptionCaption();
                        this.UpdateScaleform();
                    }
                    else if (!uiMenuItem.Enabled && uiMenuItem.Selected) {
                        Common_1.default.PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
                    }
            }
            else
                uiMenuItem.Hovered = false;
            counter++;
        }
        const extraY = 144 + 38 * (this._maxItemsOnScreen + 1) + this._offset.Y - 37 + this._extraOffset + this._safezoneOffset.Y;
        const extraX = this._safezoneOffset.X + this._offset.X;
        if (this.MenuItems.length <= this._maxItemsOnScreen + 1)
            return;
        if (Screen_1.default.IsMouseInBounds(new Point_1.default(extraX, extraY), new Size_1.default(431 + this.WidthOffset, 18))) {
            this._extraRectangleUp.Color = new Color_1.default(30, 30, 30, 255);
            if (natives_1.default.isControlJustPressed(0, 24) || natives_1.default.isDisabledControlJustPressed(0, 24)) {
                if (this.MenuItems.length > this._maxItemsOnScreen + 1)
                    this.GoUpOverflow();
                else
                    this.GoUp();
            }
        }
        else
            this._extraRectangleUp.Color = new Color_1.default(0, 0, 0, 200);
        if (Screen_1.default.IsMouseInBounds(new Point_1.default(extraX, extraY + 18), new Size_1.default(431 + this.WidthOffset, 18))) {
            this._extraRectangleDown.Color = new Color_1.default(30, 30, 30, 255);
            if (natives_1.default.isControlJustPressed(0, 24) || natives_1.default.isDisabledControlJustPressed(0, 24)) {
                if (this.MenuItems.length > this._maxItemsOnScreen + 1)
                    this.GoDownOverflow();
                else
                    this.GoDown();
            }
        }
        else
            this._extraRectangleDown.Color = new Color_1.default(0, 0, 0, 200);
    }
    ProcessControl() {
        if (!this.Visible)
            return;
        if (this._justOpened) {
            this._justOpened = false;
            return;
        }
        if (natives_1.default.isControlJustReleased(0, 177)) { // Back            
            this.GoBack();
        }
        if (this.MenuItems.length == 0)
            return;
        if (natives_1.default.isControlPressed(0, 172) && this._lastUpDownNavigation + 120 < Date.now()) { // Up
            this._lastUpDownNavigation = Date.now();
            if (this.MenuItems.length > this._maxItemsOnScreen + 1)
                this.GoUpOverflow();
            else
                this.GoUp();
            this.UpdateScaleform();
        }
        else if (natives_1.default.isControlJustReleased(0, 172)) {
            this._lastUpDownNavigation = 0;
        }
        else if (natives_1.default.isControlPressed(0, 173) && this._lastUpDownNavigation + 120 < Date.now()) { // Down
            this._lastUpDownNavigation = Date.now();
            if (this.MenuItems.length > this._maxItemsOnScreen + 1)
                this.GoDownOverflow();
            else
                this.GoDown();
            this.UpdateScaleform();
        }
        else if (natives_1.default.isControlJustReleased(0, 173)) {
            this._lastUpDownNavigation = 0;
        }
        else if (natives_1.default.isControlPressed(0, 174) && this._lastLeftRightNavigation + 100 < Date.now()) { // Left            
            this._lastLeftRightNavigation = Date.now();
            this.GoLeft();
        }
        else if (natives_1.default.isControlJustReleased(0, 174)) {
            this._lastLeftRightNavigation = 0;
        }
        else if (natives_1.default.isControlPressed(0, 175) && this._lastLeftRightNavigation + 100 < Date.now()) { // Right            
            this._lastLeftRightNavigation = Date.now();
            this.GoRight();
        }
        else if (natives_1.default.isControlJustReleased(0, 175)) {
            this._lastLeftRightNavigation = 0;
        }
        else if (natives_1.default.isControlJustReleased(0, 201)) { // Select            
            this.SelectItem();
        }
    }
    GoUpOverflow() {
        if (this.MenuItems.length <= this._maxItemsOnScreen + 1)
            return;
        if (this._activeItem % this.MenuItems.length <= this._minItem) {
            if (this._activeItem % this.MenuItems.length == 0) {
                this._minItem = this.MenuItems.length - this._maxItemsOnScreen - 1;
                this._maxItem = this.MenuItems.length - 1;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem = this._maxMenuItems - (this._maxMenuItems % this.MenuItems.length);
                this._activeItem += this.MenuItems.length - 1;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
            else {
                this._minItem--;
                this._maxItem--;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem--;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
        }
        else {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
            this._activeItem--;
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        }
        Common_1.default.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]);
        this.UpdateDescriptionCaption();
    }
    GoUp() {
        if (this.MenuItems.length > this._maxItemsOnScreen + 1)
            return;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem--;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        Common_1.default.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]);
        this.UpdateDescriptionCaption();
    }
    GoDownOverflow() {
        if (this.MenuItems.length <= this._maxItemsOnScreen + 1)
            return;
        if (this._activeItem % this.MenuItems.length >= this._maxItem) {
            if (this._activeItem % this.MenuItems.length == this.MenuItems.length - 1) {
                this._minItem = 0;
                this._maxItem = this._maxItemsOnScreen;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem = this._maxMenuItems - (this._maxMenuItems % this.MenuItems.length);
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
            else {
                this._minItem++;
                this._maxItem++;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem++;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
        }
        else {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
            this._activeItem++;
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        }
        Common_1.default.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]);
        this.UpdateDescriptionCaption();
    }
    GoDown() {
        if (this.MenuItems.length > this._maxItemsOnScreen + 1)
            return;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem++;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        Common_1.default.PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection, this.MenuItems[this._activeItem % this.MenuItems.length]);
        this.UpdateDescriptionCaption();
    }
    GoBack() {
        if (this.ParentMenu != null) {
            this.Visible = false;
            this.ParentMenu.Visible = true;
            this.MenuChange.emit(this.ParentMenu, false);
            this.MenuClose.emit(false);
        }
        else if (this.CloseableByUser) {
            this.Visible = false;
            this.CleanUp(true);
            this.MenuClose.emit(false);
        }
    }
    BindMenuToItem(menuToBind, itemToBindTo) {
        if (!this.MenuItems.includes(itemToBindTo)) {
            this.AddItem(itemToBindTo);
        }
        menuToBind.ParentMenu = this;
        menuToBind.ParentItem = itemToBindTo;
        this.Children.set(itemToBindTo.Id, menuToBind);
    }
    AddSubMenu(subMenu, itemToBindTo) {
        this.BindMenuToItem(subMenu, itemToBindTo);
    }
    ReleaseMenuFromItem(releaseFrom) {
        if (!this.Children.has(releaseFrom.Id))
            return false;
        const menu = this.Children.get(releaseFrom.Id);
        menu.ParentItem = null;
        menu.ParentMenu = null;
        this.Children.delete(releaseFrom.Id);
        return true;
    }
    UpdateDescriptionCaption() {
        if (this.MenuItems.length) {
            this._descriptionText.Caption = this.MenuItems[this._activeItem % this.MenuItems.length].Description;
            this._descriptionText.Wrap = 400;
            this._recalculateDescriptionNextFrame++;
        }
    }
    CalculateDescription() {
        if (this._recalculateDescriptionNextFrame > 0) {
            this._recalculateDescriptionNextFrame--;
        }
        this.RecalculateDescriptionPosition();
        if (this.MenuItems.length > 0 && this._descriptionText.Caption && this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim() !== "") {
            const numLines = Screen_1.default.GetLineCount(this._descriptionText.Caption, this._descriptionText.Pos, this._descriptionText.Font, this._descriptionText.Scale, this._descriptionText.Wrap);
            this._descriptionRectangle.Size = new Size_1.default(431 + this.WidthOffset, (numLines * 25) + 15);
            if (numLines === 0) {
                this._recalculateDescriptionNextFrame++;
            }
        }
    }
    UpdateScaleform() {
        if (!this.Visible || !this._buttonsEnabled)
            return;
        this._instructionalButtonsScaleform.callFunction("CLEAR_ALL");
        this._instructionalButtonsScaleform.callFunction("TOGGLE_MOUSE_BUTTONS", 0);
        this._instructionalButtonsScaleform.callFunction("CREATE_CONTAINER");
        this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", 0, natives_1.default.getControlInstructionalButton(2, Control_1.default.PhoneSelect, false), this.SelectTextLocalized);
        this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", 1, natives_1.default.getControlInstructionalButton(2, Control_1.default.PhoneCancel, false), this.BackTextLocalized);
        let count = 2;
        this._instructionalButtons.filter(b => b.ItemBind == null || this.MenuItems[this.CurrentSelection] == b.ItemBind).forEach((button) => {
            this._instructionalButtonsScaleform.callFunction("SET_DATA_SLOT", count, button.GetButtonId(), button.Text);
            count++;
        });
        this._instructionalButtonsScaleform.callFunction("DRAW_INSTRUCTIONAL_BUTTONS", -1);
    }
    render() {
        if (!this.Visible)
            return;
        if (this._buttonsEnabled) {
            natives_1.default.drawScaleformMovieFullscreen(this._instructionalButtonsScaleform.handle, 255, 255, 255, 255, 0);
            natives_1.default.hideHudComponentThisFrame(6); // Vehicle Name
            natives_1.default.hideHudComponentThisFrame(7); // Area Name
            natives_1.default.hideHudComponentThisFrame(9); // Street Name
        }
        if (this._justOpened) {
            if (this._bannerSprite != null && !this._bannerSprite.IsTextureDictionaryLoaded)
                this._bannerSprite.LoadTextureDictionary();
            if (!this._background.IsTextureDictionaryLoaded)
                this._background.LoadTextureDictionary();
            if (!this._descriptionRectangle.IsTextureDictionaryLoaded)
                this._descriptionRectangle.LoadTextureDictionary();
            if (!this._upAndDownSprite.IsTextureDictionaryLoaded)
                this._upAndDownSprite.LoadTextureDictionary();
            if (!this._recalculateDescriptionNextFrame)
                this._recalculateDescriptionNextFrame++;
        }
        this._mainMenu.Draw();
        this.ProcessMouse();
        this.ProcessControl();
        this._background.Size = this.MenuItems.length > this._maxItemsOnScreen + 1
            ? new Size_1.default(431 + this.WidthOffset, 38 * (this._maxItemsOnScreen + 1))
            : new Size_1.default(431 + this.WidthOffset, 38 * this.MenuItems.length);
        this._background.Draw();
        if (this._recalculateDescriptionNextFrame) {
            this.CalculateDescription();
        }
        if (this.MenuItems.length > 0) {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            if (this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim() !== "") {
                this._descriptionBar.Draw();
                this._descriptionRectangle.Draw();
                this._descriptionText.Draw();
            }
        }
        let count = 0;
        if (this.MenuItems.length <= this._maxItemsOnScreen + 1) {
            for (const item of this.MenuItems) {
                item.SetVerticalPosition(count * 38 - 37 + this._extraOffset);
                item.Draw();
                count++;
            }
            if (this._counterText && this._counterOverride) {
                this._counterText.Caption = this._counterPretext + this._counterOverride;
                this._counterText.Draw();
            }
        }
        else {
            for (let index = this._minItem; index <= this._maxItem; index++) {
                let item = this.MenuItems[index];
                item.SetVerticalPosition(count * 38 - 37 + this._extraOffset);
                item.Draw();
                count++;
            }
            this._extraRectangleUp.Size = new Size_1.default(431 + this.WidthOffset, 18);
            this._extraRectangleDown.Size = new Size_1.default(431 + this.WidthOffset, 18);
            this._upAndDownSprite.Pos = new Point_1.default(190 + this._offset.X + this.WidthOffset / 2, 147 + 37 * (this._maxItemsOnScreen + 1) + this._offset.Y - 37 + this._extraOffset);
            this._extraRectangleUp.Draw();
            this._extraRectangleDown.Draw();
            this._upAndDownSprite.Draw();
            if (this._counterText) {
                if (!this._counterOverride) {
                    const cap = this.CurrentSelection + 1 + " / " + this.MenuItems.length;
                    this._counterText.Caption = this._counterPretext + cap;
                }
                else {
                    this._counterText.Caption = this._counterPretext + this._counterOverride;
                }
                this._counterText.Draw();
            }
        }
        if (this._bannerRectangle != null)
            this._bannerRectangle.Draw();
        if (this._bannerSprite != null)
            this._bannerSprite.Draw();
    }
}
exports.default = NativeUI;
exports.Menu = NativeUI;
//# sourceMappingURL=NativeUI.js.map