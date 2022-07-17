const AxiosHelper = require("../helpers/AxiosHelper");

const LONGITUDE_INDEX = 0;
const LATITUDE_INDEX = 1;

class SearchModel {

    #axiosHelper = new AxiosHelper();

    async places(place) {
        const instance = this.#axiosHelper.buildMapBoxInstanceSearchPlace(place);

        try {
            const resp = await instance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                title: place.place_name,
                longitude: place.center[LONGITUDE_INDEX],
                latitude: place.center[LATITUDE_INDEX]
            }));

        } catch (err) {
            console.error(err);
        }
    }

    async weather(latitude, longitude) {
        const instance = this.#axiosHelper.buildOpenWeatherSearchData(latitude, longitude);

        try {
            const resp = await instance.get();
            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = SearchModel;
