/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { day, hour, minute, month, second, weatherType, year } from './weather';

export function playerConnect(player: alt.Player) {
  //TODO: Find good position for spawns
  player.spawn(402.5164, -1002.847, -99.2587, 0); //Character Creator

  player.setWeather(weatherType);
  player.setDateTime(day, month, year, hour, minute, second);
  
  /*
  alt.emit('a_discordBeginAuth', player);
  */

}