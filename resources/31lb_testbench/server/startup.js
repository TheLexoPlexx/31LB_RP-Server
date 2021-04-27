/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import SQL from '../../altV-Postgres-Wrapper/database.mjs';
import { PlayerEntity } from '../entities/entities.js';
import { getOnlinePlayer } from './playerHandler'
import { loginCompleted, playerConnect, playerDamage, playerDeath, playerDisconnect } from './eventHandlers';
import { dbHost, dbName, dbPassword, dbPort, dbType, dbUsername } from './postgresql_login';

export var database = new SQL(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, [
  PlayerEntity
]);

alt.on('ConnectionComplete', () => {
  alt.log("[Testbench] Connected to Database");
});

alt.on("playerConnect", playerConnect);
alt.on('playerDeath', playerDeath);
alt.on("playerDamage", playerDamage);
alt.on("playerDisconnect", playerDisconnect);

alt.on("resourceStop", () => {
  const playerList = alt.Player.all;
  playerList.forEach((player) => {
    database.fetchData("sessionid", player.id, "player", (result) => {
      result.sessionid = -1;
      database.upsertData(result, "player", (res) => {
        alt.log(JSON.stringify(res));
      });
    });
  });
});

alt.onClient("a_login", (player, name, pw) => {
  database.fetchData("password", pw, "player", (result) => {
    if (result == undefined) {
      loginCompleted(player, null, pw);
    } else {
      if (result.sessionid >= 0) {
        alt.logWarning("Player replaced sessionid " + result.sessionid);
      }
      loginCompleted(player, result, null);
    }
  });
});

alt.onClient("a_teleport", (player) => {
  /*
  player.spawn(-763.245, 328.597, 199.486);
  player.rot = new alt.Vector3(0, 0, 3.1415);
  alt.emit('character:Edit', player);
  */

  //player.spawn(229.9559, -981.7928, -99.66071); 10-car-Garage

  console.log("F4 pressed");
});

alt.on('character:Done', (player, data) => {
  alt.emit("character:Sync", player, data);
  player.pos = player.pos;
  console.log(data);
});
