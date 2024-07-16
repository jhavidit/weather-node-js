const request = require('request')

const geocode = (address, callback) => {

    const geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=1&appid=d575d309f08df19c8827584160a805a0'
    
    request(({ url: geocodingUrl, json: true }), (error, { body } = {}) => {
        try {
            console.log(body)
            debugger
            if (error) {
                callback('Unable to connect to weather services', undefined)
            } else if (body.cod === '400' || body.length == 0) {
                callback('No data available for this address', undefined)
            } else {
                callback(undefined, {
                    lat: body[0].lat,
                    lon: body[0].lon,
                    name: body[0].name
                })
            }
        } catch (e) {
            callback('No data available for this address', undefined)
        }
    })

}

const forecast = (lat, lon, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=d575d309f08df19c8827584160a805a0'

    request(({ url: url, json: true }), (error, {body}= {}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.weather == null) {
            callback('No data available for this address', undefined)
        } else {
            callback(undefined, {
                weather: body.weather
            })
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}