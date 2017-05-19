const request = require("request");


var geocodeAddress = (address)=>{
    return new Promise((resolve, reject)=>{
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;
    request({
        url,
        json: true
    }, (error, response, body)=>{
        if(error){
            reject("Unable to connect to Google API Services");
        }else if (body.status ===  "ZERO_RESULTS"){
            reject("Unable to find the entered result");
        }else if(body.status === "OK"){
            resolve({
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        }
    });
        
    });
};


geocodeAddress("44000").then((location)=>{
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=>{
    console.log(errorMessage);
});