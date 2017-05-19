const request = require("request"),
    yargs = require("yargs");


const geocode = require("./geocode/geocode.js");
const weather = require("./weather.js");

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
// console.log(argv);

geocode.geocodeAddress(argv.address, request, (errorMessage, results) => {
    if (errorMessage) console.log(errorMessage);
    else
        // console.log(results.address);
    weather.execute(request, results.lat, results.lng, (errorMessage, weatherResults) => {
        if (errorMessage) console.log(errorMessage);
        else {
            console.log(`Its currently ${weatherResults.temp}F in${results.address}`);
        }
    });
});

