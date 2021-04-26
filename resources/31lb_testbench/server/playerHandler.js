/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Player from 'alt-server';
import { database } from './startup';

var p;

function init(player) {
  database.fetchData("socialclub", Player.socialId, "player", (result) => {
    if (result == null) {
      
    } else {
      
    }
  });
  p = new SQLPlayer(socialclub_id);
}



class SQLPlayer {
  constructor(socialclub_id) {

  }
}