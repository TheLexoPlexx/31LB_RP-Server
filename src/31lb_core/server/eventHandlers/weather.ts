/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';
import * as https from "https";

export let weatherType: alt.WeatherType;
export let day: alt.DateTimeDay;
export let month: alt.DateTimeMonth;
export let year: number;
export let hour: alt.DateTimeHour;
export let minute: alt.DateTimeMinute;
export let second: alt.DateTimeSecond;

let gtaSunrise = 6;
let gtaSunset = 20;

//TODO: Entweder um 0 Uhr den Server neustarten oder ein Intervall einfügen, was das Datum aktualisiert sobald 0 Uhr ist. (Idee: Intervall je nach Ergebnis kürzer machen bis auf eine Minute runter)
export function initWeather(apiKey: String) {  
  alt.log("[31LB] Weather init...");
  let date = new Date();
  day = date.getDay() as alt.DateTimeDay;
  month = date.getMonth() as alt.DateTimeMonth;
  year = date.getFullYear();

  let url = 'https://api.openweathermap.org/data/2.5/weather?q=Manheim,DE&appid='+apiKey;
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
            weatherType = getWeatherType(json.weather) as alt.WeatherType;
            alt.log("[31LB] Retrieved Weather");

            //Bin kein Mathegenie aber hoffe mal das tut was es soll:
            let daytime = new Date((json.sys.sunset - json.sys.sunrise) * 1000);

            alt.log("Daytime: " + (((daytime.getHours() -1) * 60) + daytime.getMinutes()));

            //TODO: Doesn't do the thing, fix
            let nighttime = new Date(daytime);
            nighttime.setHours(daytime.getHours() - 24, daytime.getMinutes() - 60);

            alt.log(nighttime.getHours());
            alt.log("Nighttime: " + (((nighttime.getHours() -1) * 60) + nighttime.getMinutes()));

          } else {
            alt.log("Weather data couldn't be updated");
          }
        } catch (error) {
          alt.log("[31LB] Weather failed: " + error.message);
        }
      })
    });
  } catch (err) {
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