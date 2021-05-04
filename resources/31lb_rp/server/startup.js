/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import SQL from '../../altV-Postgres-Wrapper/database.mjs';
import { PlayerEntity, WeaponEntity } from '../entities/entities.js';
import { playerConnect } from './handlers/playerConnect';
import { playerDamage } from './handlers/playerDamage';
import { playerDeath } from './handlers/playerDeath';
import { playerDisconnect } from './handlers/playerDisconnect';
import { keyPressF9, keyPressY } from './handlers/keyHandlers';
import { login } from './handlers/loginCompleted';
import * as wm from "./weaponManager";

export const dbType = 'postgres';
export const dbHost = 'localhost';
export const dbPort = '5433';
export const dbUsername = '31lb_rpdb';
export const dbPassword = '31lb_rpdb';
export const dbName = '31lb_rpdb';

export var database = new SQL(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, [
  PlayerEntity, WeaponEntity
]);

alt.on('ConnectionComplete', () => {
  alt.log("[31LB] Connected to Database");
});

//TODO: Remove, Debug reasons
alt.on("resourceStart", (errored) => {
  alt.Player.all.forEach((player, index, array) => {
    player.setDateTime(parseInt("11"), parseInt("03"), parseInt("2021"), parseInt("8"), parseInt("0"), parseInt("0"));
  });
});

alt.on("playerConnect", playerConnect);
alt.on('playerDeath', playerDeath);
alt.on("playerDamage", playerDamage);
alt.on("playerDisconnect", playerDisconnect);

alt.onClient("a_keyup_f9", keyPressF9);
alt.onClient("a_keyup_y", keyPressY);
alt.onClient("a_login", login);

/* Character Stuff
player.spawn(-763.245, 328.597, 198.486);
player.rot = new alt.Vector3(0, 0, Math.PI);
alt.emit('character:Edit', player);
*/
alt.on('character:Done', (player, data) => {
  alt.emit("character:Sync", player, data);
  player.pos = player.pos;
  console.log(data);
});