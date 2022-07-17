const axios = require("axios");
const {MAPBOX_KEY} = process.env;
const {OPEN_WEATHER_KEY} = process.env;

class AxiosHelper {
    buildMapBoxInstanceSearchPlace(place) {
        return axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: {
                'limit': 5,
                'language': 'en',
                'access_token': MAPBOX_KEY
            }
        })
    }

    buildOpenWeatherSearchData(latitude, longitude) {
        return axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
                'lat': latitude,
                'lon': longitude,
                'appid': OPEN_WEATHER_KEY,
                'units': 'metric',
                'lang': 'es'
            }
        })
    }
}

module.exports = AxiosHelper;
