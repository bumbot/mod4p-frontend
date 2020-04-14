import React, { Component } from "react"

class LoginForm extends Component {
    
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = (event) => {
        // prevents a refresh of the page and clears form
        event.preventDefault()
        event.target.reset()

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then( json => {
            if (json.error) {
                alert(json.message)
            } else {
                this.props.updateCurrentUser(json.user_data)
            }
    })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleLogin}>
                    <label for="username">Username:</label>
                    <input
                    type="text"
                    name="username"
                    onChange={event=>this.handleUsernameChange(event)}
                    ></input>
                    <br></br>
                    <label for="password">Password:</label>
                    <input
                    type="text"
                    name="password"
                    onChange={event=>this.handlePasswordChange(event)}
                    ></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default LoginForm