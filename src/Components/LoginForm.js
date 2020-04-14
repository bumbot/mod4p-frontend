// import React, { Component } from "react"

<<<<<<< HEAD
// class LoginForm extends Component {
//     state = {
//         username: "",
//     }

//     handleChange = (event, {name, value}) => {
//         this.setState({
//             [name]: value
//         })
//     }

//     handleLogin = () => {
//         fetch("http://localhost:3001/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 username: this.state.username
//             })
//         })
//         .then(resp => resp.json())
//         .then( json => {
//             if (json.error) {
//                 alert(json.message)
//             }
//     })
//     }

//     render() {
//         return(
//             <div>
//                 <Form
//           onSubmit={this.handleLoginSubmit}
//           size="mini"
//           key="mini"
//           loading={this.props.authenticatingUser}
//           error={this.props.failedLogin}
//         >
//           <Message
//             error
//             header={this.props.failedLogin ? this.props.error : null}
//           />
//           <Form.Group widths="equal">
//             <Form.Input
//               label="username"
//               placeholder="username"
//               name="username"
//               onChange={this.handleChange}
//               value={this.state.username}
//             />
//             <Form.Input
//               type="password"
//               label="password"
//               placeholder="password"
//               name="password"
//               onChange={this.handleChange}
//               value={this.state.password}
//             />
//           </Form.Group>
//           <Button type="submit">Login</Button>
//         </Form>
//             </div>
//         )
//     }
// }
=======
class LoginForm extends Component {
    state = {
        username: "",
        password: "",
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
>>>>>>> 88876d5550943d65d94bce2e2e8d9db964b73c34

// export default LoginForm