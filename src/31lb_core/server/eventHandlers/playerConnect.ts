/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import { day, hour, minute, month, second, weatherType, year } from './weather';

export function playerConnect(player: alt.Player) {
  player.spawn(229.9559, -981.7928, -99.66071, 0); //10-car-garage

  player.setWeather(weatherType);
  player.setDateTime(day, month, year, hour, minute, second);
}