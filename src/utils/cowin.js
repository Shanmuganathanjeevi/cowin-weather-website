const request = require('request')

const cowin = (pincode, callback) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    const dateParam = 'date=' + today;
    const url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + pincode + '&' + dateParam

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Cowin service!', undefined)
        } else if (body.error) {
            callback('Unable to find vaccine status', undefined)
        } else if (body.sessions.length < 1) {
            callback('Unable to find vaccine status', undefined)
        } else {
            const response = body.sessions;
            const finalResponse = arrayOut(response);
            callback(undefined, finalResponse)
                //callback(undefined, body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

const arrayOut = (response) => {
    let output = [];
    let tmp;
    for (let i = 0; i < response.length; i++) {
        tmp = '<tr> <td>' + response[i].vaccine + '</td><td>' + response[i].name + '</td><td>' + response[i].address + '</td><td>' + response[i].fee_type + '</td><td>' + response[i].available_capacity_dose1 + '</td><td>' + response[i].available_capacity_dose2 + '</td></tr>'
        output.push(tmp);
    }
    return output;
}

module.exports = cowin