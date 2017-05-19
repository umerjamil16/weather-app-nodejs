var execute = (request, lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/API_KEY/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
            temp: body.currently.temperature,
            apparentTemp: body.currently.apparentTemperatue
        });
        } else callback("Unable to fetch weather");
    });
}

module.exports = { execute }