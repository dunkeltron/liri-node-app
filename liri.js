var dot = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require('./keys');
var request = require("request");
var fs = require("fs");
var moment = require("moment");
moment().format();
console.log("load spotify");
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert-this") {
    console.log("concrets");
    var artist = process.argv[3];
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (body == "{error=Not Found}\n" || body == "{warn=Not found}\n") {
            return console.log("Error: Results not found for " + artist);
        }
        else {
            var data = JSON.parse(body);
            data.forEach(element => {
                console.log();
                console.log("Venue: " + (element.venue.name));
                console.log("City: " + element.venue.city);
                console.log("Date: " + moment(element.datetime).format("MM-DD-YYYY"));
            })

        }
    });
}
else if (process.argv[2] === "spotify-this-song") {
    console.log("spotify");
    spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
        if (err) {
            return console.log("An error occurred. error code:" + err);
        }
        console.log(data.tracks.items[0]);
        //print artists
        var artistArr = data.tracks.items[0].artists;
        artistArr.forEach(element => {
            console.log(element.name);
        });
        //track name
        console.log(data.tracks.items[0].name);
        //album name of first item in API response
        console.log(data.tracks.items[0].album.name);
    });
}
else if (process.argv[2] === "movie-this") {
    var query = "https://www.omdbapi.com/?apikey=" + keys.omdb.id + "&t=";
    if (process.argv[3] == undefined || process.argv == "") {
        query += "mr nobody";
    }
    else {
        query += process.argv[3];
    }
    request(query, function (err, response, body) {
        if (err) {
            return console.log(err);
        }
        var parsedBody = JSON.parse(body);
        console.log(parsedBody.Title);
        console.log(parsedBody.Year);
        console.log(parsedBody.Ratings[0].Value);   //imdb
        console.log(parsedBody.Ratings[1].Value);   //rotten tomatoes
        console.log(parsedBody.Country);
        console.log(parsedBody.Language);
        console.log(parsedBody.Plot);
        console.log(parsedBody.Actors);

    })
} else if (process.argv[2] === "do-what-it-says") {
    console.log("time to log");
} else {
    console.log("Argument \" " + process.argv[2] + "\" not recognized.");
}
