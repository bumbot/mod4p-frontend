import React, { Component } from "react"
import "./Player.css"

class Player extends Component {

    
    
    // Playback methods rely on the parent elemnent id to avoid repetition 

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
                <p onClick={this.props.getCurrentlyPlaying}>Current Song</p>
                {this.props.showPlayer ? 
                    <div className="App">
                        <div className="main-wrapper">
                            <div className="now-playing__img">
                            <img src={this.props.songData.item.album.images[0].url} />
                            <div className="now-playing__name">Song: {this.props.songData.item.name}</div>
                            <div className="now-playing__artist">Artist: {this.props.songData.item.artists[0].name}</div>
                            <div className="now-playing__status">{this.props.songData.is_playing ? "Playing" : "Paused"}</div>
                            </div>
                            <div className="progress">
                                <div className="progress__bar" style={{width: (this.props.songData.progress_ms * 100 / this.props.songData.item.duration_ms) + '%'}} />
                            </div>
                        </div>
                        <button onClick={this.previousNext} id="previous">Previous</button>
                        <button onClick={this.playPause} id="play">Play</button>
                        <button onClick={this.playPause} id="pause">Pause</button>
                        <button onClick={this.previousNext} id="next">Next</button>
                    </div>
                : null }
            </div>
        )
    }
}

export default Player




