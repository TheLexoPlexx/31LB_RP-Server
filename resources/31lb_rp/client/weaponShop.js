/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import { WeaponList, getWeaponByName } from './../lib/weapons';
import * as NativeUI from "./lib/nativeui/nativeui"

export function openWeaponShop() {

  getPlayerWeapons();
  /*
  native.setPlayerSimulateAiming(alt.Player, true);

  var et = alt.everyTick(() => {
    native.disableAllControlActions(alt.Player.local.scriptID, true);
    for (var i = 172; i <= 181; i++) {
      native.enableControlAction(alt.Player.local.scriptID, i, true);
    }
  });

  alt.setTimeout(() => {
    alt.clearEveryTick(et);
  }, 20000);


  var pt = alt.Player.local.pos;
  var rtz = alt.Player.local.rot.z;

  var rot_neu = (rtz + Math.PI * 0.5) * 180 / Math.PI;
  if (rot_neu < 0) {
    rot_neu += 360;
  }

  var b = -1;
  var c = 0.3;

  var cam_x = pt.x + b * -Math.sin(rtz + Math.PI * 0.5) + c * Math.cos(rtz + Math.PI * 0.5);
  var cam_y = pt.y + b * Math.cos(rtz + Math.PI * 0.5) + c * Math.sin(rtz + Math.PI * 0.5);

  var cam = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_x, cam_y, pt.z + 0.5, 0, 0, rot_neu, 50, true, 2);
  native.setCamAffectsAiming(cam, false);
  native.renderScriptCams(true, true, 1250, true, true, cam);

  //Menu
  const ui = new NativeUI.Menu("", "Alle Waffen die du tragen kannst!", new NativeUI.Point(50, 50));
  ui.SetSpriteBannerType(new NativeUI.Sprite("shopui_title_gunclub", "shopui_title_gunclub", new NativeUI.Point(0, 0), new NativeUI.Size()));

  var inventorytitle = "Inventar";
  ui.AddItem(new NativeUI.UIMenuListItem(
    inventorytitle,
    "Wähle das Inventar aus.",
    new NativeUI.ItemsCollection(["Eigenes Inventar", "Waffenladen"])
  ));

  ui.ListChange.on((item, newListItemIndex) => {
    if (item.Text == inventorytitle) {
      alt.log("[ListChange] " + newListItemIndex, item.Text);
    }
  });

  ui.Open();
  */
}

/*
  ui.ListChange.on((item, index) => {
      alt.log("[AutoListChange] " + itemcol.getListItems()[index].DisplayText, item.Text);
      alt.log("item: " + JSON.stringify(item));
      if (item == itemcol.getListItems()[0]) {
          alt.log("[AutoListChange2] " + changeDirection + " " + item.Data.name + " " + item.Data.data);
          alt.log(newListItemIndex);
      }
  });

  var types = [];
  var utility = WeaponList.fireextinguisher.type;
  var melee = WeaponList.flashlight.type;
  var thrown = WeaponList.flare.type;
  Object.values(WeaponList).forEach(element => {
    var type = element["type"];
    if (!types.includes(type)) {
      if (type != utility || type != melee || type != thrown) {
        types.push(element["type"]);
      }
    }
  });

  ui.AddItem(new NativeUI.UIMenuListItem(
    "Waffenklasse",
    "Description for List Item",
    new NativeUI.ItemsCollection(types)
  ));

  ui.ItemSelect.on(item => {
    if (item instanceof NativeUI.UIMenuListItem) {
      alt.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
    } else if (item instanceof NativeUI.UIMenuSliderItem) {
      alt.log(item.Text, item.Index, item.IndexToItem(item.Index));
    } else {
      alt.log(item.Text);
    }
  });
*/

function getPlayerWeapons() {
  var weaponInv = [];
  var componentInv = [];
  var selector = 0;
  Object.values(WeaponList).forEach(value => {
    if (native.hasPedGotWeapon(alt.Player.local.scriptID, value.hash, false)) {
      if (value.hash != WeaponList.unarmed) { //unarmed
        alt.log(JSON.stringify(value.constructor.name));

        weaponInv[selector] = Object.getOwnPropertyNames(value);

        /*
        if (value.components != null) {
          Object.values(value.components).forEach(comp => {
            if (native.hasPedGotWeaponComponent(alt.Player.local.scriptID, value.hash, comp.hash)) {
              compList.push(comp.name);
            }
          });
          //Doesn't work
          alt.log(JSON.stringify(value.name + ": " + compList));
          weapons[value.hash] = value.hash;

          if (compList.length == 0) {
          } else {
            weapons.push(value.hash[compList]);
          }
        } else {
          weapons.push(value.hash[null]);
        }
        */
      }
    }
  });
  //alt.log(JSON.stringify(weapons));
}