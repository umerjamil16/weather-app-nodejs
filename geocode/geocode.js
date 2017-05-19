
var geocodeAddress = function (argvAddress, request, callback) {
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argvAddress)}`;

    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connec tgoogle services");
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find the entered result");
        }
        else if (body.status === "OK") {
            callback(undefined, {
                address: ` ${body.results[0].formatted_address}`,
                lat: `${body.results[0].geometry.location.lat}`,
                lng: ` ${body.results[0].geometry.location.lng}`

            });
        }
    });
}

module.exports = { geocodeAddress };