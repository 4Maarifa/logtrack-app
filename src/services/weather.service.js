
import ErrorService from './error.service';
import DataService from './data.service';
import WeatherDataService from './entities/weather.service';

const WeatherService = {
  // TODO: celsius or fahrenheiht ?
  getWeather(lon, lat) {
    const longitudeLitteral = Math.floor(parseFloat(lon) * 100) / 100;
    const latitudeLitteral = Math.floor(parseFloat(lat) * 100) / 100;

    return new Promise((resolve, reject) => {
      WeatherDataService.getByLatAndLon(longitudeLitteral, latitudeLitteral)
        .then(result => {
          if(!!result) {
            resolve(result);
          }
          else {
            resolve(WeatherService.__getWeatherFromAPI(longitudeLitteral, latitudeLitteral));
          }
        })
        .catch(e => ErrorService.manageErrorThenReject(e, reject));
    });
  },
  __getWeatherFromAPI(lon, lat) {
    const currentDateLitteral = (new Date()).toISOString().substring(0, 14);
    const longitudeLitteral = Math.floor(lon * 100) / 100;
    const latitudeLitteral = Math.floor(lat * 100) / 100;

    return new Promise((resolve, reject) => {
      DataService.computed.getWeatherViaAPI(longitudeLitteral, latitudeLitteral)
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

export default WeatherService;
