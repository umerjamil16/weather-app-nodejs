var execute = (request, lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/d786c589b17f27284b852cd3e023b120/${lat},${lng}`,
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