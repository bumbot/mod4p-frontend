import React, { Component } from "react"

const authEndpoint = 'https://api.genius.com/oauth/authorize'
const clientId = "msZLD8ONdsunFPEz1p6cbxgoAeJfZa_Ou9zQpCGcEFOUNSIgbXSI-bpLUjukJlLb"
const redirectUri = "http://localhost:3000"
const scopes = "me"
const link = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&state=test&response_type=token`
const fetchUrl = `https://api.genius.com/songs/378195`

class Genius extends Component {
    
    constructor() {
        super()
        this.state = {
            responseToken: window.location.hash.substring(14, 78),
            appToken: "6xaKmzdn43cIetHEmyoLhy3Y9gjeHFdWYVGDy-mQwpNWNGXz3UyKqTRksFHgKra9"
        }
    }
    
   
    getSong = () => {
        fetch(`${fetchUrl}`, {
            headers: {
                "Authorization": "Bearer " + this.state.appToken
            }
        }).then(
            resp => console.log(resp)
        )
    }
    
    
    render() {
        return(
            <div>
            <a href={link}>Login to Genius</a>
            <div onClick={this.getSong}>Get a song</div>
            </div>
        )
    }
}

export default Genius 