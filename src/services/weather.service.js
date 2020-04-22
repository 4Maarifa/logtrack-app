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
import DataService from './data.service';
import WeatherDataService from './entities/weather.service';

const WeatherService = {
  // TODO: celsius or fahrenheiht ?
  getWeather: (lon, lat) => {
    const longitudeLitteral = Math.floor(parseFloat(lon) * 100) / 100;
    const latitudeLitteral = Math.floor(parseFloat(lat) * 100) / 100;

    return new Promise((resolve, reject) => {
      WeatherDataService.getByLatAndLon(longitudeLitteral, latitudeLitteral)
        .then(result => result ? resolve(result) : resolve(WeatherService.__getWeatherFromAPI(longitudeLitteral, latitudeLitteral)))
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  callWeatherViaAPI: (lon, lat) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${keys.openWeatherMapAPIKey}`)
            .then(response => response.json())
            .then(resolve)
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  __getWeatherFromAPI: (lon, lat) => {
    const currentDateLitteral = (new Date()).toISOString().substring(0, 14);
    const longitudeLitteral = Math.floor(lon * 100) / 100;
    const latitudeLitteral = Math.floor(lat * 100) / 100;

    return new Promise((resolve, reject) => {
      DataService.computed.callWeatherViaAPI(longitudeLitteral, latitudeLitteral)
        .then(result => {
          const weatherLine = {
            date: currentDateLitteral,

            latitude: latitudeLitteral,
            longitude: longitudeLitteral,
            name: result.name,

            icon: result.weather[0].icon,
            main: result.weather[0].main,
            temp: result.main.temp
          };
          WeatherDataService.create(weatherLine)
            .then(() => resolve(weatherLine))
            .catch(e => ErrorService.manageErrorThenReject(e, reject));
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  }
};

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
