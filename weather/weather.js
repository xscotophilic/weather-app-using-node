const request = require('request');

//Generate your Weather API Key And Use it below From Forecast.io
const WeatherAPI = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

var getWeather = (lati, long, callback) => {

    request({
        url: `https://api.darksky.net/forecast/${WeatherAPI}/${lati},${long}`,
        json: true,
    }, (error, response, body) => {
        if(error)
            {
                callback('Unable to connect Forecast.io server.');
            }
            else if(response.statuscode === 400)
            {
                callback('Unable to fetch weather.');
            }
            else if(!error)
            {
                callback(undefined, {
                    Summary: body.currently.summary,
                    Temperature_in_celsius: (((body.currently.temperature-32)*5)/9),
                    Humidity: body.currently.humidity,
                    Pressure: body.currently.pressure,
                    WindSpeed: body.currently.windSpeed,
                });
            }
    });

};

module.exports.getWeather = getWeather;