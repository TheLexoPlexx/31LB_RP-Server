import { day, hour, minute, month, second, weatherType, year } from './weather';
export function playerConnect(player) {
    player.spawn(402.5164, -1002.847, -99.2587, 0);
    player.setWeather(weatherType);
    player.setDateTime(day, month, year, hour, minute, second);
}
