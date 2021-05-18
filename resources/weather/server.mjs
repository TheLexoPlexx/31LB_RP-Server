import * as alt from 'alt';
import Weather from './weather';

let weatherSync = new Weather("fcc3d6ce0fb5093fde973d098c7f85bb", "Cologne", "DE");

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