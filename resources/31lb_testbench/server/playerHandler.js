/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import Player from 'alt-server';
import { database } from './startup';

export function getOnlinePlayer(player) {
  return new SQLPlayer(player.id);
}

export class SQLPlayer {
  result_json;

  constructor(session_id) {
    database.fetchData("sessionid", session_id, "player", (result) => {
      this.result_json = result;
      console.log(JSON.stringify(this.result_json));
      console.log(JSON.stringify(result));
    });
  }

  update() {
    database.upsertData(this.result_json, "player", () => {
      console.log("Data update: " + alt.log(result_json));
    });
  }

  /**
   * Namen holen
   * @returns Name, String
   */
  get name() {
    return this.result_json.name;
  }

  /**
   * Namen setzen
   * @param name Neuer Name
   */
  set name(name) {
    this.result_json.name = name;
  }

  get name() {
    return this.result_json.name;
  }

}