const request = require("request"),
        yargs = require("yargs");

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

console.log(argv);

var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

request({
    url,
    json: true
}, (error, response, body)=>{
    if (error){
    console.log("Wrong address");
}else if (body.status === "ZERO_RESULTS"){
    console.log("Unable to find the entred result");
}
else if (body.status === "OK"){
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Lat: ${body.results[0].geometry.location.lat}`);
    console.log(`Lan: ${body.results[0].geometry.location.lng}`);    
}
});