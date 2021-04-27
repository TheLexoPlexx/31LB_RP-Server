/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import SQL from '../../postgres-wrapper/database.mjs';
import { PlayerEntity } from '../entities/entities.js';
import { getOnlinePlayer } from './playerHandler'
import { loginCompleted, playerConnect, playerDamage, playerDeath, playerDisconnect } from './eventHandlers';

const dbType = 'postgres';
const dbHost = 'localhost';
const dbPort = '5433'; 
const dbUsername = '31lb_rpdb';
const dbPassword = '31lb_rpdb';
const dbName = '31lb_rpdb';

export var database = new SQL(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, [
  PlayerEntity
]);

alt.on('ConnectionComplete', () => {
  alt.log("Connected to DB");
});

alt.on("playerConnect", playerConnect);
alt.on('playerDeath', playerDeath);
alt.on("playerDamage", playerDamage);
alt.on("playerDisconnect", playerDisconnect);

//TODO: Session-IDs zurücksetzen auf -1 bei Serverneustart und alle Spieler speichern
//Vielleicht durch vorher alle kicken?

alt.onClient("a_login", (player, name, pw) => {
  database.fetchData("password", pw, "player", (result) => {
    if (result == undefined) {
      loginCompleted(player, null, pw);
    } else {
      if (result.sessionid >= 0) {
        alt.emitClient(player, "a_consoleMessage", "Already logged in");
      } else {
        loginCompleted(player, result, null);
      }
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

  var p = getOnlinePlayer(player)
  alt.setTimeout(() => {
    p.name = "Testname";
    p.update();
  }, 500);
});

alt.on('character:Done', (player, data) => {
  alt.emit("character:Sync", player, data);
  player.pos = player.pos;
  console.log(data);
});
