class PlaceModel {
    static printCity = place => {
        console.log('PlaceModel Information: \n');

        console.log('ID: ', place.id);
        console.log('Name: ', place.title);
        console.log('Latitude: ', place.latitude);
        console.log('Longitude: ', place.longitude);
        console.log('Max temp: ', place.weather.max);
        console.log('Min temp: ', place.weather.min);
        console.log('Description: ', place.weather.desc);
        console.log('Current temp, :', place.weather.temp);
    };
}

module.exports = PlaceModel;

