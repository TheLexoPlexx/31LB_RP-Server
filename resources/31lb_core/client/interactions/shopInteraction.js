import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../util/nativeui/NativeUi';
import { PresetList } from './placeGenerator';
import { componentIds } from '../util/clothdict';
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
            addPieces(categoryC, index);
        }
    });
}
async function addPieces(category, index) {
    categitem = new NativeUI.UIMenuItem(componentIds[index]);
    mainmenu.AddItem(categitem);
    categmenu = new NativeUI.Menu(componentIds[index], "", new NativeUI.Point(50, 50));
    categmenu.SetRectangleBannerType(new NativeUI.ResRectangle(new NativeUI.Point(0, 0), null, new NativeUI.Color(0, 0, 0)));
    if (componentIds[index].length >= 16) {
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
            categmenu.AddItem(pieceitem);
            let texturemenu = new NativeUI.Menu(title, "", new NativeUI.Point(50, 50));
            categmenu.AddSubMenu(texturemenu, pieceitem);
            clothPiece.texture.forEach(xt => {
                let pieceitem = new NativeUI.UIMenuItem(xt);
                texturemenu.AddItem(pieceitem);
            });
        }
    });
}
