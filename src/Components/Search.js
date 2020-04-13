import React, { Component } from "react"

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

    // In order get immediate song playback when the user clicks the song card, you have to get a little sneaky. 
    // First you have to grab the song uri (which is set as its div id when it's created)
    // Then you have to add that song to the Play Queue with a POST request 
    // Finally you have to command the player to go to the next song (which is the song we just put in the queue)
    // This allows immediate playback of any song clicked on the page
    
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
        }).then(this.next)
    }
    
    render() {
        return(
            <form>
                <label>Track: </label>
                <input type="text" onChange={this.updateTrack}></input>
                <label>Artist: </label>
                <input type="text" onChange={this.updateArtist}></input>
                <input type="submit" onClick={this.submitSearch}></input>
                {this.state.searchResults.map(result => {
                    return( 
                        <div onClick={this.playSong} id={result.uri}>
                            <h3>{result.name}</h3>
                            <img src={result.album.images[0].url} width={250} height={250} />
                        </div>
                    )
                })}
            </form>
        )
    }
}

export default Search