import React, { Component } from "react"
import "./App.css"
import Player from "./Components/Player.js"
import Search from "./Components/Search.js"
import Genius from "./Components/Genius.js"
import LoginForm from "./Components/LoginForm.js"

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
      // After a sucessful login to Spotify, the Spotify API will return to our app page with our access token in the site's url
      // The substring method allows us to ignore the #access_token= in the url and just gets the token itself
      // Every fetch call to the Spotify API will need this token as part of its header 
      // Tokens expire after 1 hour 
      accessToken: window.location.hash.substring(14),
      currentUser: null
    }
  }

  

  render() {
    return (
      <div className="App">
        <LoginForm updateCurrentUser={this.updateCurrentUser}/>
        <header className="App-header">
          <a href={loginLink}>Login to Spotify</a>
          <Search token={this.state.accessToken} />
          <Player token={this.state.accessToken}/>
          <Genius />
        </header>
      </div>
    );
  }
}

export default App;
