/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { database } from './startup';

export function getPlayer(player, callback) {
  database.fetchData("sessionid", player.id, "player", (result) => {
    if (callback != null) {
      callback(result);
    }
  });
}

export function setValue(result, callback) {
  database.upsertData(result, "player", (r) => {
    if (callback != null) {
      callback(r);
    }
  });
}