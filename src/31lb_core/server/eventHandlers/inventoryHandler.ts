/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { fixPlayer } from '../managers/playerManager';

export function openedInventory(player: alt.Player) {
  fixPlayer(player);
}