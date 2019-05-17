const request = require("request");


const forecast = (latitude,longitude,callback) => 
{
    const url = "https://api.darksky.net/forecast/e44efd2c977bdc8d4147084649fac80b/"+latitude+","+longitude+"?units=si&lang=en";

    request({url, json:true},(err,{body})=>{
        if(err)
        {
            callback("Unable to connect to the darksky server",undefined)
        }
        else if(body.error)
        {
            callback("Incorrect information provided in the url",undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + '% chance of rain. The amount of Humidity is ' + body.currently.humidity + ". The pressure is about " + body.currently.pressure+ ".")
        }
    })
}

module.exports=forecast;