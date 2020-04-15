import React, { Component } from "react"


class Genius extends Component {
    
    render() {
        return(<div className="preformatted">{this.props.lyrics}</div>)
    }
}

export default Genius 