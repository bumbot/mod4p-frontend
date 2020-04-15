import React, { Component } from "react"

class Player extends Component {

  playPause = (event) => {
      fetch(`https://api.spotify.com/v1/me/player/${event.target.id}`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + this.props.token
        }
      })
    }
  
  previousNext = (event) => {
      fetch(`https://api.spotify.com/v1/me/player/${event.target.id}`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + this.props.token
        }
      })
  }

  render() {
      return(
          <div>
              <p className="get-song" onClick={this.props.getCurrentlyPlaying}>Get Song</p>
              {this.props.showPlayer ? 
                  <div>
                      <div>
                        <div>
                          <img src={this.props.songData.item.album.images[0].url} />
                          <div>Song: {this.props.songData.item.name}</div>
                          <div>Artist: {this.props.songData.item.artists[0].name}</div>
                          <div>{this.props.songData.is_playing ? "Playing" : "Paused"}</div>
                        </div>
                        <div>
                          <button onClick={this.previousNext} id="previous">Previous</button>
                          <button onClick={this.playPause} id="play">Play</button>
                          <button onClick={this.playPause} id="pause">Pause</button>
                          <button onClick={this.previousNext} id="next">Next</button>
                        </div>
                      </div>
                  </div>
              : null }
          </div>
      )
  }
}

export default Player




// Progress bar 
// <div style={{width: (this.props.songData.progress_ms * 100 / this.props.songData.item.duration_ms) + '%'}} />
                     