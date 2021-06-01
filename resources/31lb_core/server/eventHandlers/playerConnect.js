import { day, hour, minute, month, second, weatherType, year } from './weather';
export function playerConnect(player) {
    player.spawn(229.9559, -981.7928, -99.66071, 0);
    player.setWeather(weatherType);
    player.setDateTime(day, month, year, hour, minute, second);
}
