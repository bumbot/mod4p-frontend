import React, { Component } from "react"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import "./App.css"
import Player from "./Components/Player.js"
import Search from "./Components/Search.js"
import Genius from "./Components/Genius.js"
import LoginForm from "./Components/LoginForm.js"

// Spotify login URL
const authEndpoint = 'https://accounts.spotify.com/authorize'
const clientId = "8836102077dc476b87b683e9fbcd411a"
const redirectUri = "http://localhost:3001"
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state"
]
const loginLink = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`




class App extends Component {
  
  // if successfully logged in, changes the currentUser to user obj
  updateCurrentUser = user => {
    this.setState({
      currentUser: user  
    })
  }

  // clears currentUser in order to log out
  logOut = () => {
    this.setStaet({
      currentUser: null
    })
  }
  
  constructor() {
    super();
    this.state = {
      accessToken: window.location.hash.substring(14),
      showPlayer: false,
      songData: {},
      currentUser: null
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
        this.setState({showPlayer: true, songData: data})
      }
    )
  }

  getSpotifyLogin = () => {
    return(
      <div>
        <a href={loginLink}>Login to Spotify</a>
        <br />
        <NavLink to="/player" exact>Go to player</NavLink>
        <br />
        <NavLink to="/search" exact>Got to search</NavLink>
      </div>
    )
  }

  getSearch = () => {
    return(
      <div>
        <Search token={this.state.accessToken} goToPlayer={this.goToPlayer}/>
        <br />
        <NavLink to="/" exact>Go back</NavLink>
      </div>
    )
  }

  goToPlayer = () => {
    console.log('working')
  }

  getPlayer = () => {
    return(
      <div>
        <Player token={this.state.accessToken} showPlayer={this.state.showPlayer} songData={this.state.songData} getCurrentlyPlaying={this.getCurrentlyPlaying}/>
        <Genius songData={this.state.songData} /> 
        <NavLink to="/" exact>Go back</NavLink>
      </div>
    )
  }

  render() {
    return (
<<<<<<< HEAD
      <Router>
        <div className="App">
          <header className="App-header">
            <Route exact path="/" render={() => this.getSpotifyLogin()} />
            <Route exact path="/search" render={() => this.getSearch() } />
            <Route exact path="/player" render={() => this.getPlayer() } />
          </header>
        </div>
      </Router>
    )
=======
      <div className="App">
        <LoginForm updateCurrentUser={this.updateCurrentUser}/>
        <header className="App-header">
          <a href={loginLink}>Login to Spotify</a>
          <Search token={this.state.accessToken} />
          <Player token={this.state.accessToken} showPlayer={this.state.showPlayer} songData={this.state.songData} getCurrentlyPlaying={this.getCurrentlyPlaying}/>
          <Genius currentSong={this.state.currentSong} />
        </header>
      </div>
    );
>>>>>>> 88876d5550943d65d94bce2e2e8d9db964b73c34
  }
}

export default App;
