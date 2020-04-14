import React, { Component } from "react"
//import AutoFill from "./Components/Autofill"

class Search extends Component {
    
    constructor() {
        super()
        this.state = {
            track: "",
            artist: "",
            // Each song is put into this array, and will be mapped over to create song cards 
            searchResults: []
        }
    }

    updateTrack = (event) => {
        this.setState({track: event.target.value})
    }

    updateArtist = (event) => {
        this.setState({artist: event.target.value})
    }

    submitSearch = (event) => {
        event.preventDefault()
        fetch(`https://api.spotify.com/v1/search?q=track:${this.state.track}%20artist:${this.state.artist}&type=track`, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then(
            resp => resp.json()
        ).then(
            data => this.setState({searchResults: data.tracks.items})
        ) 
    }
    
    next = () => {
        fetch("https://api.spotify.com/v1/me/player/next", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + this.props.token
          }
        })
    }

    playSong = (event) => {
        let token = this.props.token
        fetch(`https://api.spotify.com/v1/me/player/queue?uri=${event.target.parentElement.id}`, {
        method: "POST", 
        headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then(
            this.next
        ).then(
            this.props.goToPlayer()
        )
    }
    
    render() {
        return(
            <form>
                <label>Track: </label>
                <input type="text" onChange={this.updateTrack}></input>
                <label>Artist: </label>
                <input type="text" onChange={this.updateArtist}></input>
                <input type="submit" onClick={this.submitSearch}></input>
                <div className="gallery">
                {this.state.searchResults.map(result => {
                    return( 
                        <div onClick={this.playSong} id={result.uri}>
                            <h3>{result.name}</h3>
                            <img src={result.album.images[0].url} width={250} height={250} />
                        </div>
                    )
                })}
                </div>
            </form>
        )
    }
}

export default Search