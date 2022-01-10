const request = require('postman-request');

const weatherStackToken = '339bc1ff9adca155982321c0b66510c8';

const forecast = (lat, long, getWeatherCallback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherStackToken}&query=${lat},${long}&units=m`;
    request({ url: weatherUrl }, (error, {body}) => {
        if (error) {
            console.log(`Unable to connect to weather services`);
        }
        else {
            const data = JSON.parse(body);
            if (data.error) {
                console.log(data.error.info);
            }
            else {
                const callBackData = {
                    locationName: data.location.name,
                    dataStr: `Is is currently ${data.current.temperature} degrees out but feels like ${data.current.feelslike} degrees out in ${data.location.name}, ${data.location.country}.`
                };
                getWeatherCallback(callBackData);
            }
        }
    }, null);
};

module.exports = forecast