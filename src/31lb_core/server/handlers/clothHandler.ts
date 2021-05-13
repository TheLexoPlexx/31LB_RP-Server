/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import * as playerManager from "../playerManager";
import { clothesFile, whitelistClothesFile } from '../startup';

export function clothSelect(player) {
  playerManager.getPlayer(player, (r) => {
    if (r.permissionsgroup >= 100) {
      alt.emitClient(player, "a_clothselector", clothesFile, whitelistClothesFile);
    } else {
      alt.emitClient(player, "a_nopermission");
    }
  });
}