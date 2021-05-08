/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { getWeaponByName } from "../../lib/weapons";
import * as playerManager from "../playerManager";
import * as wm from "../weaponManager";
import { generate } from './placeHandler';

var menuopen = false;

export function keyPressF9(player: alt.Player) {
  alt.log("F9 pressed");
  
  alt.emitClient(player, "a_weaponselect_s");
  //generate(player);
}

export function keyPressY(player: alt.Player) {
  //placeholder, only used on client so far
} 

export function keyPressI(player: alt.Player) {
  //placeholder, only used on client so far
} 