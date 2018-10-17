var dot = require("dotenv").config();
var keys = require('./keys');
var request = require("request");
var fs = require("fs");
const cols = 8;
var moment = require("moment");

// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
function inputManager(str, str2) {
    if (str === "concert-this") {
        concertThis(str2);


    }
    else if (str === "spotify-this-song") {
        spotifyThis(str2);
    }
    else if (str === "movie-this") {
        movieThis(str2);
    }
    else if (str === "do-what-it-says") {
        try{
            fs.readFileSync('random.txt').toString().split('\n').forEach(function (line) {
                inputManager(line.split(",")[0], line.split(",")[1]);
            });
        }
        catch(err){
            console.log("random.txt File not Found");
        }

    } else {
        console.log("Argument \" " + str + "\" not recognized.");
    }
}
function spotifyThis(str) {

    str = removeQuotes(str);
    spotify.search({ type: 'track', query: str, limit: 1 }, function (err, data) {
        if (err) {
            return console.log("An error occurred. error code:" + err);
        }
        //data.tracks.items is the array of search hits from the API. We only use the first response in this case
        var song = data.tracks.items[0];

        //track name
        console.log("Track Name:    " + song.name);
        //album name of the track
        console.log("Album Name:    " + song.album.name);
        //print artists
        var artistArr = song.artists;
        console.log("Artist(s): ");
        artistArr.forEach(element => {
            console.log("    " + element.name);
        });
        if (song.preview_url) {
            console.log("Preview Link:    " + song.preview_url);
        }
        else {
            console.log("Preview URL not available for this song.");
        }
    });
}
function movieThis(str) {

    str = removeQuotes(str);
    var query = "https://www.omdbapi.com/?apikey=" + keys.omdb.id + "&t=";
    if (str == undefined || str == "") {
        query += "mr nobody";
    }

    else {
        query += str;
    }
    request(query, function (err, response, body) {
        if (err) {
            return console.error(err);
        }
        var parsedBody = JSON.parse(body);
        if (parsedBody.Title != undefined) {
            console.log("Title: " + parsedBody.Title);
            console.log("Year: " + parsedBody.Year);
            console.log("IMDB rating: " + parsedBody.Ratings[0].Value);   //imdb
            console.log("Rotten Tomatoes rating: " + parsedBody.Ratings[1].Value);   //rotten tomatoes
            console.log("Production Countries: " + parsedBody.Country);
            console.log("Language: " + parsedBody.Language);
            console.log("Plot: " + parsedBody.Plot);
            console.log("Notable Actors: " + parsedBody.Actors);
            console.log();  //empty line for clarity with multiple liri requests
        }
        else {
            console.log("Couldn't find a movie with that title.");
        }
    });


}
function concertThis(str) {
    str = removeQuotes(str);
    if (str == undefined || str == "") {
        return console.log("No artist search term given.");
    }
    else {
        var artist = str;
        request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

            if (body.split("=")[0] == "{error" || body.split("=")[0] == "{warn") {
                return console.log("Error: Results not found for " + artist);
            }
            else {
                var data = JSON.parse(body);
                if (data.length != 0) {
                    console.log("Upcoming concerts for " + str);
                    data.forEach(element => {
                        console.log();
                        console.log("Venue: " + (element.venue.name));
                        console.log("City: " + element.venue.city);
                        console.log("Date: " + moment(element.datetime).format("MM-DD-YYYY"));
                    });

                }
                else {
                    console.log("Couldn't find any upcoming concerts for " + str);
                }
            }
        });
    }
}
function removeQuotes(str) {
    var returnStr = "";
    if (str != undefined) {
        for (i = 0; i < str.length; i++) {
            if (str[i] === "\"") {
            }
            else {
                returnStr += str[i];
            }
        }
    }
    else {
        return str
    }
    return returnStr;
}

inputManager(process.argv[2], process.argv[3]);