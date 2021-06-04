import * as alt from 'alt-server';
import * as https from "https";
export let weatherType;
export let day;
export let month;
export let year;
export let hour;
export let minute;
export let second;
let gtaSunrise = 6;
let gtaSunset = 20;
let interval;
let intervalTimer;
export function initWeather(apiKey) {
    alt.log("[31LB] Weather init...");
    alt.clearInterval(intervalTimer);
    let date = new Date();
    day = date.getDay();
    month = date.getMonth();
    year = date.getFullYear();
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=Manheim,DE&appid=' + apiKey;
    try {
        https.get(url, (res) => {
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            });
            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    if (json !== undefined) {
                        weatherType = getWeatherType(json.weather);
                        alt.log("[31LB] Retrieved Weather");
                        let sunrise = json.sys.sunrise * 1000;
                        let sunset = json.sys.sunset * 1000;
                        let daytime = new Date(sunset - sunrise);
                        daytime.setHours(daytime.getHours() - 1);
                        let nighttime = new Date(daytime);
                        nighttime.setHours(23 - daytime.getHours(), 60 - daytime.getMinutes());
                    }
                    else {
                        alt.log("Weather data couldn't be updated");
                    }
                }
                catch (error) {
                    alt.log("[31LB] Weather failed: " + error.message);
                }
            });
        });
    }
    catch (err) {
        console.log('Fetching weather failed: ' + err);
    }
}
function getWeatherType(weatherArray) {
    switch (weatherArray[0].main) {
        case 'Drizzle':
            return 8;
        case 'Clear':
            return 1;
        case 'Clouds':
            return 2;
        case 'Rain':
            return 6;
        case 'Thunderstorm':
            return 7;
        case 'Thunder':
            return 7;
        case 'Foggy':
            return 4;
        case 'Fog':
            return 4;
        case 'Mist':
            return 4;
        case 'Smoke':
            return 4;
        case 'Smog':
            return 3;
        case 'Overcast':
            return 5;
        case 'Snowing':
            return 10;
        case 'Snow':
            return 10;
        case 'Blizzard':
            return 11;
        default:
            return 1;
    }
}
