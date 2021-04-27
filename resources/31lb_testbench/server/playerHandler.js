/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Player from 'alt-server';
import { database } from './startup';

var p;

function get(player) {
  return new SQLPlayer(player.id);
}

class SQLPlayer {
  constructor(session_id) {
    database.fetchData("sessionid", player.id, "player", (result) => {
      
    });
  }
}