/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
/// <reference types="@types/sortablejs" />
import * as alt from 'alt-client';
import * as native from 'natives';
import Sortable from "sortablejs";

//https://github.com/SortableJS/Sortable/releases/tag/1.13.0
//TODO: block movement of clothes

export class Item {
  displayname: string;
  sizeHeight: number;
  sizeWidth: number;
  maxStacksize: number;
}

export class ItemHolder {
  displayname: string;
  sizeHeight: number;
  sizeWidth: number;
  items : [
    {
      posx: string;
      posy: string;
      item: Item;
    }
  ];
}

let invData = {
  int: null,
  ext: null,
}

let open: boolean = false,
  viewmode: number,
  cam: number,
  disableControlLoop: number,
  inventoryview: alt.WebView;

let transitiontime: number = 500;

export function toggleInventory(forceClose?: boolean) {
  if (forceClose) {
    if (open) {
      closeInventory();
    }
  } else {
    if (!open) {
      openInventory();
    } else {
      closeInventory();
    }
  }
}

function openInventory() {

  open = true;
  viewmode = native.getFollowPedCamViewMode();

  disableControlLoop = alt.everyTick(() => {
    native.disableAllControlActions(alt.Player.local.scriptID);
  });

  
  if (alt.Player.local.vehicle == undefined) {
    var pt = alt.Player.local.pos;
    var rtz = alt.Player.local.rot.z;
  
    var rot_neu = (rtz + Math.PI) * 180 / Math.PI;
    if (rot_neu < 0) {
      rot_neu += 360;
    }
  
    var b = 0.75;
    var c = 2.5;
  
    var cam_x = pt.x + b * -Math.sin(rtz + Math.PI * 0.5) + c * Math.cos(rtz + Math.PI * 0.5);
    var cam_y = pt.y + b * Math.cos(rtz + Math.PI * 0.5) + c * Math.sin(rtz + Math.PI * 0.5);
  
    cam = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_x, cam_y, pt.z+0, 0, 0, rot_neu, 50, true, 2);
    native.setCamAffectsAiming(cam, false);
    native.renderScriptCams(true, true, transitiontime, true, true, cam);
  }

  alt.showCursor(true);
  //Inventar anzeigen
  inventoryview = new alt.WebView("http://resource/client/pages/inventory/inv.html?inv=" + encodeURIComponent(JSON.stringify(invData)), true);

  //TODO: Get Clothes and pass to player / use syncedmeta-version
  //1. Set und get clothes-Feature mit Klamotten und syncedmeta
  //2. Einbauen in das Inventar
  //3. Einbauen in den Shop
  inventoryview.on("load", () => {
    inventoryview.emit("makeVisible");
    inventoryview.emit("inventorydata", invData);
  });
}

function closeInventory() {
  open = false;

  viewmode = undefined;

  alt.clearEveryTick(disableControlLoop);
  native.destroyCam(cam, true);
  native.renderScriptCams(false, true, transitiontime, true, true, 0);
  native.setFollowPedCamViewMode(viewmode);

  inventoryview.destroy();
  alt.showCursor(false);
}

function getClothes(): ItemHolder[] {
  let holder: ItemHolder[] = [];

  for (var i = 0; i <= 11; i++) {
    let c = alt.getSyncedMeta("inventory_" + i);
    if (c != undefined) {
      holder.push(c);
    }
  }

  if (holder.length == 0) {
    alt.logWarning("Inventory empty");
  }

  return holder;
}