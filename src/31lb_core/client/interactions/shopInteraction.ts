/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../util/nativeui/NativeUi';
import { colshapeMeta, PresetList } from './placeGenerator';
import { componentIds } from '../util/clothdict';
import { clothing_inventory_m } from "./../shops/inventories/clothing_m";
import { clothing_inventory_f } from "./../shops/inventories/clothing_f";

/*
interface ClothData {
  cHash: string;
  price: number;
  drawable: number;
  inventory: InventorySpace;
  texture: string[];
  restrictionTags: string[];
  componentType: string;
}

interface InventorySpace {
  x: number;
  y: number;
}
*/

let mainmenu: NativeUI.Menu;
let categmenu: NativeUI.Menu;
let categitem: NativeUI.UIMenuItem;

/*
alt.logWarning("Started...");
clothing_inventory_f.clothes.forEach((element) => {
  element.forEach((component) => {
    clothing_inventory_m.clothes.forEach((element2) => {
      element2.forEach(component2 => {
        let split1 = component.cHash.split("_");
        let split2 = component2.cHash.split("_");

        for (var i = 0; i <= split1.length; i++) {
          if (split1[i] == "F") {
            split1[i] = "X";
          }
        }
        for (var i = 0; i <= split1.length; i++) {
          if (split2[i] == "M") {
            split2[i] = "X";
          }
        }
        if (split1.join("_") == split2.join("_")) {
          alt.log(split1.join("_"));
        }
      });
    });
  });
});
alt.logWarning("Ended!");
*/

export function openShopInteraction(cm: colshapeMeta) {
  mainmenu = new NativeUI.Menu("", cm.description == null ? "" : cm.description, new NativeUI.Point(50, 50));
  mainmenu.SetSpriteBannerType(new NativeUI.Sprite(cm.banner, cm.banner, new NativeUI.Point(0, 0), new NativeUI.Size(0, 0)));
  mainmenu.GetTitle().DropShadow = true;

  let onduty: boolean = alt.Player.local.getSyncedMeta("team_onduty");

  if (cm.shop == PresetList["clothing1"].shop) {
    let source;
    if (native.getEntityModel(alt.Player.local.scriptID) == 1885233650) {
      clothingShopMenu(cm, clothing_inventory_m, onduty);
    } else if (native.getEntityModel(alt.Player.local.scriptID) == 2627665880) {
      clothingShopMenu(cm, clothing_inventory_f, onduty);
    } else {
      alt.logError("Wrong Model");
    }
  }

  //Inventar
  //whitelist
  //onduty-check
  //Kamera-Veränderungen
  //Individuelle
  //Menu erstellung
  mainmenu.Open();
}

function clothingShopMenu(cm: colshapeMeta, inventory_file, onduty) {
  inventory_file.clothes.forEach((categoryC, index) => {
    addPieces(categoryC, index);
  });

  inventory_file.props.forEach((categoryP, index) => {
    addPieces(categoryP, index);
  });
}

function addPieces(category, index) {
  categitem = new NativeUI.UIMenuItem(componentIds[index]);
  mainmenu.AddItem(categitem);

  categmenu = new NativeUI.Menu(componentIds[index], "", new NativeUI.Point(50, 50));
  mainmenu.AddSubMenu(categmenu, categitem);

  Object.values(category).forEach((clothPiece: any) => {
    if (clothPiece != null) {
      let title;
      if (clothPiece.texture[0] == null) {
        title = clothPiece.cHash;
      } else {
        title = clothPiece.texture[0];
      }
      let pieceitem = new NativeUI.UIMenuItem(title);
      categmenu.AddItem(pieceitem);
    
      let texturemenu = new NativeUI.Menu(title, "", new NativeUI.Point(50, 50));
      categmenu.AddSubMenu(texturemenu, categitem);
    
      clothPiece.texture.forEach(xt => { 
        let pieceitem = new NativeUI.UIMenuItem(xt);
        texturemenu.AddItem(pieceitem);
      });
    }
  });
}