# liri-node-app
This program allows users to input specific command line arguments in order to search the internet for concert, movie, or spotify, information.

### Getting Started ###
Before using the program the user must obtain a spotify ID and spotify secret ID.Then the user must create a .env file with the following code in it. (replace the text on the right of the equals sign with your information.)

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* This .env file and the spotify keys are essential to running the spotify portion of the program. Without this file and those keys the spotify portion of the program will not work.

* This program uses node modules so the user must have node installed on their device.


* The program uses the command line to take in arguments from the user. There are four accepted commands. 

    1. concert-this "Band Name" , this command uses the bandsintown events api to find and return any upcoming shows that "Band Name" may have.

    1. spotify-this-song "Song Name" , this command uses the node-spotify-api node package to search spotify for the desired song. This command will return the first result found by the api call only. 
        * The function displays:
            1. Song Name.
            2. Album the song is on.
            3. Artist(s)
        * If the user is searching for a more niche artist being as specific as possible should help return the desired result. 

    1. movie-this "Movie Title" , this command uses searches omdb for "Movie Title". If the api call gets a result the program wil output the following information.
        1. Movie Title.
        1. Release year.
        1. IMDB rating.
        1. Rotten Tomatoes rating.
        1. Countries the movie was produced in.
        1. Original anguage of the movie.
        1. The plot.
        1. List of notable actors in the movie.
    
    1. do-what-it-says , this command reads the first line from random.txt calls the corresponding method. 
        * For example, if the first line of random.txt is concert-this,"Rick Ross" the program will make a concert-this call with Rick Ross as the search term.

        * If the user wants to edit the search term they can edit 'random.txt'. However the format of the call in 'random.txt' must be command,"Search Term". See [example](./images/do-what-it-says-random-formatting.png) for clarification
        
        * Currently do-what-it-says only reads the first line of the file for inputs. Plans for multi line support are being held up by synchronicity issues in the function calls.
## If you need more examples of how the program works check out the images folder ##