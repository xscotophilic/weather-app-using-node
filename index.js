const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {demand: true, alias: 'a', decsribe: 'Address to fetch Weather', string: true}
    })
    .help()
    .alias('help','h')
    .argv;

var geoaddress = encodeURIComponent(argv.address);
geocode.geocodeAddress(geoaddress, (errorMessage, results)=>{
    if(errorMessage)
    {
        console.log(errorMessage);
    }
    else
    {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherresults)=>{
            if(errorMessage)
             {
                 console.log(errorMessage);
             }
             else
             {
                 console.log(weatherresults);
             }
        });
    }

});

