const request = require('request')

const forecast = (longitude, lattitude, callback) => {
    const coordinates = lattitude + ',' + longitude;

    const url = 'http://api.weatherstack.com/current?access_key=9731a8e0da0ebd6383fda6d68a22a46d&query='+coordinates;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather service', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const forecast = body.location.name +' '+ body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature+' degrees but feels like '+body.current.feelslike+' degrees. The Humidity is '+ body.current.humidity;
            callback(undefined, 
                forecast
                )
        }
    })
}

module.exports = forecast;