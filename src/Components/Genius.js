import React, { Component } from "react"


class Genius extends Component {

    
    render() {
        return(
        <div>
            <a href={this.props.songUrl}>Go to Genius</a>
            <div className="preformatted">{this.props.lyrics}</div>
        </div>
        )
    }
}

export default Genius 