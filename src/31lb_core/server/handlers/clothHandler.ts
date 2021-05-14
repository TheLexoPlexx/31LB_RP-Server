/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { loadFileJSON } from '../fileManager';
import * as playerManager from "../playerManager";
//import { clothesFile, whitelistClothesFile } from '../startup';

/*
export function clothSelect(player) {
  playerManager.getPlayer(player, (r) => {
    if (r.permissionsgroup >= 100) {
      alt.emitClient(player, "a_clothselector", clothesFile, whitelistClothesFile);
    } else {
      alt.emitClient(player, "a_nopermission");
    }
  });
}
*/

export function sortClothes() {
  var clothFile = loadFileJSON("pedComponentVariations");
}

/*

F/M -> componentId -> drawableId -> Hash/textureid/label/price/invspacex-y/RestrictionTags/ComponentType

*/