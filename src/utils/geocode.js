const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmF2ZWVua20iLCJhIjoiY2wwbHJibW9mMGFxdzNqcGg2bzA5em00NSJ9.4Wd66Wouh3dni3G5Oef00w&limit=1'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to geotag the specific location. Try another search', undefined)
        } else {
            callback(undefined, {
                lattitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;