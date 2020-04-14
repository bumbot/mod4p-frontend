import React, { Component } from "react"
import "./App.css"
import Player from "./Components/Player.js"
import Search from "./Components/Search.js"
import Genius from "./Components/Genius.js"

const authEndpoint = 'https://accounts.spotify.com/authorize'
// The unique id for our app registered with Spotify 
const clientId = "8836102077dc476b87b683e9fbcd411a"
// Where to return after the user has logged into their Spotify account
const redirectUri = "http://localhost:3001"
// The scope is the set of permissions the user gives our app
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state"
]
// This is the full url our app will call
const loginLink = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      // After a sucessful login to Spotify, the Spotify API will return to our app page with our access token in the site's url
      // The substring method allows us to ignore the #access_token= in the url and just gets the token itself
      // Every fetch call to the Spotify API will need this token as part of its header 
      // Tokens expire after 1 hour 
      accessToken: window.location.hash.substring(14),
      currentSong: {song: "No Brainer", artist: "Ashnikko"},
      showPlayer: false,
      songData: {}
    }
  }

  getCurrentlyPlaying = () => {
    fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        "Authorization": "Bearer " + this.state.accessToken
      }
    }).then(
      resp => resp.json()
    ).then(
      data => {
        this.setState({showPlayer: true, songData: data, currentSong:{song: data.item.name, artist: data.item.artists[0].name}})
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href={loginLink}>Login to Spotify</a>
          <Search token={this.state.accessToken} />
          <Player token={this.state.accessToken} showPlayer={this.state.showPlayer} songData={this.state.songData} getCurrentlyPlaying={this.getCurrentlyPlaying}/>
          <Genius currentSong={this.state.currentSong} />
        </header>
      </div>
    );
  }
}

export default App;
