import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../util/nativeui/NativeUi';
import { PresetList } from './placeGenerator';
import { componentIds, propIds } from '../util/clothdict';
import { clothing_inventory_m } from "./../shops/inventories/clothing_m";
import { clothing_inventory_f } from "./../shops/inventories/clothing_f";
let mainmenu;
let categmenu;
let categitem;
export function openShopInteraction(cm) {
    mainmenu = new NativeUI.Menu("", cm.description == null ? "" : cm.description, new NativeUI.Point(50, 50));
    mainmenu.SetSpriteBannerType(new NativeUI.Sprite(cm.banner, cm.banner, new NativeUI.Point(0, 0), new NativeUI.Size(0, 0)));
    mainmenu.GetTitle().DropShadow = true;
    let onduty = alt.Player.local.getSyncedMeta("team_onduty");
    if (cm.shop == PresetList["clothing1"].shop) {
        let source;
        if (native.getEntityModel(alt.Player.local.scriptID) == 1885233650) {
            clothingShopMenu(cm, clothing_inventory_m, onduty);
        }
        else if (native.getEntityModel(alt.Player.local.scriptID) == 2627665880) {
            clothingShopMenu(cm, clothing_inventory_f, onduty);
        }
        else {
            alt.logError("Wrong Model");
        }
    }
    mainmenu.Open();
}
async function clothingShopMenu(cm, inventory_file, onduty) {
    inventory_file.clothes.forEach((categoryC, index) => {
        if (categoryC != null) {
            addPieces(categoryC, index, false);
        }
    });
}
async function addPieces(category, index, props) {
    let componentTitle = props ? (propIds[index] == null ? "undefinedProp" : propIds[index]) : (componentIds[index] == null ? "undefinedComp" : componentIds[index]);
    categitem = new NativeUI.UIMenuItem(componentTitle);
    mainmenu.AddItem(categitem);
    categmenu = new NativeUI.Menu(componentTitle, "", new NativeUI.Point(50, 50));
    categmenu.SetRectangleBannerType(new NativeUI.ResRectangle(new NativeUI.Point(0, 0), null, new NativeUI.Color(0, 0, 0)));
    if (componentTitle.length >= 16) {
        categmenu.GetTitle().Scale = 0.9;
    }
    mainmenu.AddSubMenu(categmenu, categitem);
    category.forEach((clothPiece) => {
        if (clothPiece != null) {
            let title;
            if (clothPiece.texture[0] == null) {
                title = clothPiece.cHash;
            }
            else {
                title = clothPiece.texture[0];
            }
            let pieceitem = new NativeUI.UIMenuItem(title);
            pieceitem.setMeta("prop", props);
            pieceitem.setMeta("componentid", index);
            pieceitem.setMeta("drawableid", clothPiece.drawable);
            categmenu.AddItem(pieceitem);
            if (clothPiece.texture.length > 1) {
                let texturemenu = new NativeUI.Menu(componentTitle, "", new NativeUI.Point(50, 50));
                if (componentTitle.length >= 16) {
                    categmenu.GetTitle().Scale = 0.9;
                }
                texturemenu.SetRectangleBannerType(new NativeUI.ResRectangle(new NativeUI.Point(0, 0), null, new NativeUI.Color(0, 0, 0)));
                categmenu.AddSubMenu(texturemenu, pieceitem);
                pieceitem.SetRightBadge(NativeUI.BadgeStyle.ArrowRight);
                clothPiece.texture.forEach((xt, xtInd) => {
                    let txItem = new NativeUI.UIMenuItem(xt == undefined ? "undefined" : xt);
                    txItem.setMeta("prop", props);
                    txItem.setMeta("componentid", index);
                    txItem.setMeta("drawableid", clothPiece.drawable);
                    txItem.setMeta("textureid", xtInd);
                    texturemenu.AddItem(txItem);
                });
                texturemenu.MenuOpen.on(() => {
                    setComp(texturemenu.MenuItems[0]);
                });
                texturemenu.IndexChange.on((index, selection) => {
                    setComp(selection, selection.getMeta("textureid"));
                });
            }
        }
    });
    categmenu.MenuOpen.on(() => {
        setComp(categmenu.MenuItems[0]);
    });
    categmenu.IndexChange.on((index, selection) => {
        setComp(selection);
    });
}
function setComp(selection, texture) {
    alt.log((selection.getMeta("prop") ? "prop " : "cloth ") + selection.getMeta("componentid") + " - " + selection.getMeta("drawableid"));
    if (selection.getMeta("prop")) {
        native.setPedPropIndex(alt.Player.local.scriptID, selection.getMeta("componentid"), selection.getMeta("drawableid"), (texture == undefined ? 0 : texture), true);
    }
    else {
        native.setPedComponentVariation(alt.Player.local.scriptID, selection.getMeta("componentid"), selection.getMeta("drawableid"), (texture == undefined ? 0 : texture), 2);
    }
}
