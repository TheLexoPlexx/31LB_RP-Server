/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { ItemHolder } from '../../client/interactions/inventory';
import { setCloth } from '../managers/playerManager';
import { saveVehicles } from '../managers/vehicleManager';

export function keyPressF9(player: alt.Player) {
  //placeholder
  let t: ItemHolder = {
    displayname: "Weiß, lose",
    sizeHeight: 6,
    sizeWidth: 10,
    items: null,
  };
  setCloth(player, 8, t, 64, 0, "patchday20ng")
}

export function keyPressY(player: alt.Player) {
  //placeholder, only used on client so far
} 

export function keyPressI(player: alt.Player) {
  //placeholder, only used on client so far
} 

export function keyPressM(player: alt.Player) {
  //placeholder, only used on client so far
} 