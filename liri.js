var dot = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require('./keys');
var request = require("request");
var fs = require("fs");
console.log("load spotify");
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert-this") {
    console.log("concrets");
    var artist = process.argv[3];
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        console.log('error', error);
        //console.log(response[0]);
        console.log(response.body);
        // var data = body;
        // data.forEach(element => {
        //     console.log(element);
        // })
    });
} else if (process.argv[2] === "spotify-this-song") {
    console.log("spotify");
    spotify.search({type:'track',query: process.argv[3],limit:1},function(err,data){
        if(err){
            return console.log("An error occurred. error code:"+err);
        }
        console.log(data.tracks.items[0]);
        //print artists
        var artistArr = data.tracks.items[0].artists;
        artistArr.forEach(element =>{
            console.log(element.name);
        });
        //track name
        console.log(data.tracks.items[0].name);
        //album name of first item in API response
        console.log(data.tracks.items[0].album.name);
    });


} else if (process.argv[2] === "movie-this") {
    console.log("omdb");
    var query = "https://www.omdbapi.com?apikey"+keys.omdb.id+"&t=";
    request(query+process.argv[3],function(err,response){
        if(err){
            return console.log(err);
        }
        console.log(response);
    })
} else if (process.argv[2] === "do-what-it-says") {
    console.log("time to log");
} else {
    console.log("Argument \" " + process.argv[2] + "\" not recognized.");
}
/*
bandsintown notes check out JSON.parse(body)
*/