var dot = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require('./keys');
var request = require("request");
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert-this") {
    if (process.argv[3] == undefined || process.argv[3] == "") {
        return Console.log("No artist search term given.");
    }
    else {
        console.log("Upcoming concerts for "+ process.argv[3]);
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
   
}
else if (process.argv[2] === "spotify-this-song") {
    spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
        if (err) {
            return console.log("An error occurred. error code:" + err);
        }
        //console.log(data.tracks.items);
        //data.tacks.items is the array of search hits from the API. We only use the first response in this case
        var song=data.tracks.items[0];
        
        //track name
        console.log("Track Name:    "+song.name);
        //album name of the track
        console.log("Album Name:    "+song.album.name);
        //print artists
        var artistArr = song.artists;
        console.log("Artist(s): ");
        artistArr.forEach(element => {
            console.log("    "+element.name);
        });
        if(song.preview_url){
            console.log("Preview Link:    "+ song.preview_url);
        }
        else{
            console.log("Preview URL not available for this song.");
        }
    });
}
else if (process.argv[2] === "movie-this") {
    var query = "https://www.omdbapi.com/?apikey=" + keys.omdb.id + "&t=";
    if (process.argv[3] == undefined || process.argv[3] == "") {
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
        console.log("Title: "+parsedBody.Title);
        console.log("Year: "+parsedBody.Year);
        console.log("IMDB rating: "+parsedBody.Ratings[0].Value);   //imdb
        console.log("Rotten Tomatoes rating: "+parsedBody.Ratings[1].Value);   //rotten tomatoes
        console.log("Production Countries: "+parsedBody.Country);
        console.log("Language: "+parsedBody.Language);
        console.log("Plot: "+parsedBody.Plot);
        console.log("Notable Actors: "+parsedBody.Actors);

    })
} else if (process.argv[2] === "do-what-it-says") {
    console.log("time to log");
} else {
    console.log("Argument \" " + process.argv[2] + "\" not recognized.");
}
/*
bandsintown notes check out JSON.parse(body)
*/