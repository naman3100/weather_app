const request=require('request');

const geocode = (address, callback)=>
{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFtYW4xMSIsImEiOiJjanQ4bDR4N3UwOTdlNDNxeTd4bGszeGtsIn0.oR6L-l1HxIXHAiF-6JpjXQ"

    request({url, json:true},(error, {body}) =>
    {
        if(error)
        {
            callback('Not able to connect the server',undefined);
        }
        else if(body.features.length===0)
        {
            callback('Unable to find the location. Please try with some other location',undefined)
        }
        else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;