const request = require('request');

//Generate your Geocoding API Key And Use it below
const GeocodeAPI = 'AIzaXXXXXXXXXXXXKXXXXXXXXXXXXXXXXXXXXXX';

var geocodeAddress = (geoaddress, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${geoaddress},+CA&key=${GeocodeAPI}`,
        json: true,
    },(error, response, body)=>{
        if(error)
        {
            callback('unable to connect google server.');
        }
        else if(body.status === 'ZERO_RESULTS')
        {
            callback('unable to find the address.');
        }
        else if(body.status === 'OVER_QUERY_LIMIT')
        {
            callback('You have exceeded your daily request quota for this API.');
        }
        else if(body.status === 'OK')
        {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;