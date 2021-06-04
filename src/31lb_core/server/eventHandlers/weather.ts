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

let interval;
let intervalTimer;

//TODO: Entweder um 0 Uhr den Server neustarten oder ein Intervall einfügen, was das Datum aktualisiert sobald 0 Uhr ist. (Idee: Intervall je nach Ergebnis kürzer machen bis auf eine Minute runter)
export function initWeather(apiKey: String) {
  alt.log("[31LB] Weather init...");

  alt.clearInterval(intervalTimer);

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
            let sunrise = json.sys.sunrise * 1000;
            let sunset = json.sys.sunset * 1000;
            let daytime = new Date(sunset - sunrise);
            daytime.setHours(daytime.getHours() - 1);

            let nighttime = new Date(daytime);
            nighttime.setHours(23 - daytime.getHours(), 60 - daytime.getMinutes());

            //Daytime + Nighttime sind 20 weniger als 1440 Minuten, ka warum
            //alt.log("Daytime: " + ((daytime.getHours() * 60) + daytime.getMinutes()));
            //alt.log("Nighttime: " + (((nighttime.getHours() -1) * 60) + nighttime.getMinutes()));
            //alt.log("Total: " + (24*60));

            //Does not do the thing... at all

            /*
            let gtaDaytime = gtaSunset - gtaSunrise;

            let dayMod = (gtaDaytime * 60) / ((daytime.getHours() * 60) + daytime.getMinutes());
            let nightMod = ((24-gtaDaytime) * 60) / (((nighttime.getHours() -1) * 60) + nighttime.getMinutes());

            alt.log("[31LB] Day-Modifier: " + dayMod);
            alt.log("[31LB] Night-Modifier: " + nightMod);

            let nowts = Date.now();
            let today = new Date(nowts);
            day = today.getDay() as alt.DateTimeDay;
            month = today.getMonth() + 1 as alt.DateTimeMonth;
            hour = today.getHours() as alt.DateTimeHour;
            minute = today.getMinutes() as alt.DateTimeMinute;
            year = today.getFullYear();

            //TODO: Testen
            interval = (1000 * 60) * (isDay(nowts) ? dayMod : nightMod);
            alt.log("Interval is: " + interval / 1000);
            intervalTimer = alt.setInterval(() => {
              minute = minute + interval / 1000 as alt.DateTimeMinute;
              if (minute >= 60) {
                minute -= 60;
                hour += 1;
              }

              alt.log("Time on Server: ")
              alt.log(hour);
              alt.log(minute);
              alt.Player.all.forEach(p => {
                p.setDateTime(day, month, year, hour, minute, second);
              });

            }, interval);

            function isDay(nowts: number): boolean {
              if (nowts <= sunrise) {
                alt.log("== Before Sunrise");
                return false;
              } else if (nowts >= sunrise && nowts <= sunset) {
                alt.log("== Day");
                return true;
              } else if (nowts >= sunset) {
                alt.log("== After Sunset");
                return false;
              } else {
                alt.logWarning("== Time Error:");
                alt.logWarning("= Sunrise: " + sunrise);
                alt.logWarning("= Sunset: " + sunset);
                alt.logWarning("= Now: " + nowts);
                return null;
              }
            }
              */
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