import { 
  faSun, faMoon, 
  faCloudSun, faCloudMoon,
  faCloud, 
  faCloudsSun, faCloudsMoon, 
  faCloudShowers, 
  faCloudRain, 
  faThunderstormSun, faThunderstormMoon, 
  faSnowflake, 
  faFog } from '@fortawesome/pro-light-svg-icons';

import keys from './../params.inc';

import ErrorService from './error.service';
import WeatherDataService from './entities/weather.service';

/**
 * Service: WeatherService
 * Weather related information
 */
const WeatherService = {

  // Get the weather at a specified location
  // TODO: celsius or fahrenheiht ?
  getWeather: (lon, lat) => {

    // Remove useless precision
    const LONGITUDE_LITTERAL = Math.floor(parseFloat(lon) * 100) / 100;
    const LATITUDE_LITTERAL = Math.floor(parseFloat(lat) * 100) / 100;

    return new Promise((resolve, reject) => {

      // Check if we already have a recent weather prevision at that position
      WeatherDataService.getRecentByLatAndLon(LONGITUDE_LITTERAL, LATITUDE_LITTERAL)
              // If we have, return it. Otherwise, get the weather from the API
        .then(result => result ? resolve(result) : resolve(WeatherService.__getWeatherFromAPI(LONGITUDE_LITTERAL, LATITUDE_LITTERAL)))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },

  // Call the OpenWeather API
  __callWeatherViaAPI: (lon, lat) => new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${keys.openWeatherMapAPIKey}`)
            .then(response => response.json())
            .then(resolve)
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    }),

  // Get the weather from the API
  __getWeatherFromAPI: (lon, lat) => {

    // Bulding the date of today as a string
    const CURRENT_DATE_LITTERAL = (new Date()).toISOString().substring(0, 14);

    // Remove useless precision
    const LONGITUDE_LITTERAL = Math.floor(lon * 100) / 100;
    const LATITUDE_LITTERAL = Math.floor(lat * 100) / 100;

    return new Promise((resolve, reject) => {

      // Call the API
      WeatherService.__callWeatherViaAPI(LONGITUDE_LITTERAL, LATITUDE_LITTERAL)
        .then(result => {

          // Build a weather item, with the date, position and result
          const WEATHER_ITEM = {
            date: CURRENT_DATE_LITTERAL,

            latitude: LATITUDE_LITTERAL,
            longitude: LONGITUDE_LITTERAL,
            name: result.name,

            icon: result.weather[0].icon,
            main: result.weather[0].main,
            temp: result.main.temp
          };

          // Save the weather in the DB. This permits to call the API only once for that position
          WeatherDataService.create(WEATHER_ITEM)
            .then(() => resolve(WEATHER_ITEM))
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

/**
 * Enum: EWeatherIcons
 * Enum that corresponds OpenWeather API icon codes with FA icons (FA/IconReference)
 */
export const EWeatherIcons = {
  '01d': faSun,
  '01n': faMoon,

  '02d': faCloudSun,
  '02n': faCloudMoon,

  '03d': faCloud,
  '03n': faCloud,

  '04d': faCloudsSun,
  '04n': faCloudsMoon,

  '09d': faCloudShowers,
  '09n': faCloudShowers,

  '10d': faCloudRain,
  '10n': faCloudRain,

  '11d': faThunderstormSun,
  '11n': faThunderstormMoon,

  '13d': faSnowflake,
  '13n': faSnowflake,

  '50d': faFog,
  '50n': faFog,
};

export default WeatherService;
