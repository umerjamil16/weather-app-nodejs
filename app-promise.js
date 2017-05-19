const request = require("request"),
    yargs = require("yargs");
const axios = require("axios");


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;


axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === "ZERO_RESULTS"){
        throw new Error("Unable to find that address");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/d786c589b17f27284b852cd3e023b120/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherURL);
}).then((response)=>{
    var temp = response.data.currently.temperature;
    var appTemp = response.data.currently.apprentTemperature;
    console.log(`Its curr. temp: ${temp}. It feels like ${appTemp}`);
}).catch((e)=>{
    if(e.code === "ENOTFOUND"){
        console.log("Cannot connect to the server.");
    }else{
        console.log(e.message);
    }
});
