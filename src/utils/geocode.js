const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhbm11Z2FuYXRoYW5qZWV2aSIsImEiOiJja3BqcW96ZDMzN3lwMnJsbHpnZXdqYWg1In0.OaRRATKxcFNPPUDt0Esn2g'
        //"https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1Ijoic2hhbm11Z2FuYXRoYW5qZWV2aSIsImEiOiJja3BqcW96ZDMzN3lwMnJsbHpnZXdqYWg1In0.OaRRATKxcFNPPUDt0Esn2g"
    request({ url, json: true }, (error, { body }) => {
        // console.log(body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode