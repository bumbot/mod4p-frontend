import React, { Component } from "react"

const authEndpoint = 'https://api.genius.com/oauth/authorize'
const clientId = "msZLD8ONdsunFPEz1p6cbxgoAeJfZa_Ou9zQpCGcEFOUNSIgbXSI-bpLUjukJlLb"
const redirectUri = "http://localhost:3000"
const scopes = "me"
const link = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&state=test&response_type=token`
const fetchUrl = `http://localhost:3000/get_song`

class Genius extends Component {
    
    constructor() {
        super()
        this.state = {
            lyrics: "..."
        }
    }
   
    getSongLyrics = (event) => {
        fetch(`${fetchUrl}?song=${this.props.songData.item.name}&artist=${this.props.songData.item.artists[0].name}`).then(
            resp => resp.json()
        ).then(
            data => this.setState({lyrics: data["lyrics"]})
        )
    }
    
    render() {
        return(
            <div>
                <div className="get-lyrics" onClick={this.getSongLyrics}>Get lyrics</div>
                <div className="preformatted">{this.state.lyrics}</div>
            </div>
        )
    }
}

export default Genius 