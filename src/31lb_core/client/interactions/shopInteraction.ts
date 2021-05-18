/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from '../util/nativeui/NativeUi';
import { colshapeMeta } from './placeGenerator';

let mainmenu: NativeUI.Menu;

export function openShopInteraction(cm: colshapeMeta) {
  mainmenu = new NativeUI.Menu("", cm.description, new NativeUI.Point(50, 50));
  mainmenu.GetTitle().DropShadow = true;

  alt.log(JSON.stringify(cm));


  //Inventar
  //whitelist
  //onduty-check
  //Kamera-Veränderungen
  //Individuelle
  //Menu erstellung
  mainmenu.Open();
}