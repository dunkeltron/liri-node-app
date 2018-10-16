var dot = require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require('./keys');
var request = require("request");
console.log("load spotify");
var spotify = new Spotify(keys.spotify);
if(process.argv[2]==="concert-this"){
    console.log("concrets");
    
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
}
else if(process.argv[2]==="spotify-this-song"){
    console.log("spotify");
}
else if(process.argv[2]==="movie-this"){
    console.log("omdb");
}
else if(process.argv[2]==="do-what-it-says"){
    console.log("time to log");
}
else{
    console.log("Argument \" "+ process.argv[2]+"\" not recognized.");
}