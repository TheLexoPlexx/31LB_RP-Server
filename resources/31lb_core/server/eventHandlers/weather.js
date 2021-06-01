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
export function initWeather(apiKey) {
    alt.log("[31LB] Weather init...");
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
                        let daytime = new Date((json.sys.sunset - json.sys.sunrise) * 1000);
                        alt.log("Daytime: " + (((daytime.getHours() - 1) * 60) + daytime.getMinutes()));
                        let nighttime = new Date(daytime);
                        nighttime.setHours(daytime.getHours() - 24, daytime.getMinutes() - 60);
                        alt.log(nighttime.getHours());
                        alt.log("Nighttime: " + (((nighttime.getHours() - 1) * 60) + nighttime.getMinutes()));
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
