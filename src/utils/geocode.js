const request = require('postman-request');

const mapboxToken = 'pk.eyJ1Ijoic29lbmFpbmdodGV0IiwiYSI6ImNrd3oxdWRvODBqemUydnEzN2JpZGd2Y2oifQ.KKHIugGbpKxr4Jl-gKCj-g';

const geocode = (locationQuery, getLocationCallback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery}.json?access_token=${mapboxToken}`;
    request({ url: geoUrl }, (error, {body}) => {
        if (error) {
            console.log(`Unable to connect to geo location services`);
        } else {
            const data = JSON.parse(body);
            if (data.features.length === 0) {
                console.log(`location '${locationQuery}' cannot be found.`);
            }
            else {
                const callBackData = {
                    lat: data.features[0].center[1],
                    long: data.features[0].center[0],
                }
                getLocationCallback(callBackData);
            }
        }
    });
};

module.exports = geocode
