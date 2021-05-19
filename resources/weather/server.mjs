import * as alt from 'alt';
import Weather from './weather';

//https://api.openweathermap.org/data/2.5/weather?q=Cologne,DE,&appid=63fe821e3bbfe092b2d68f232317f9c2
let weatherSync = new Weather("63fe821e3bbfe092b2d68f232317f9c2", "Cologne", "DE");

alt.on('consoleCommand', (msg) => {
    switch(msg){
        case "startWeather": weatherSync.startSync();
            break;
        case "stopWeather": weatherSync.stopSync();
            break;
        case "currentTemp": weatherSync.getTemp();
            break;
        case "currentData": weatherSync.getCurrentData();
            break;
        default: break;
    }
});