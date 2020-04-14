import React, { Component } from "react"

class LoginForm extends Component {
    state = {
        username: "",
    }

    handleChange = (event, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    handleLogin = () => {
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username
            })
        })
        .then(resp => resp.json())
        .then( json => {
            if (json.error) {
                alert(json.message)
            }
    })
    }

    render() {
        return(
            <div>
                <Form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message
            error
            header={this.props.failedLogin ? this.props.error : null}
          />
          <Form.Group widths="equal">
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
            </div>
        )
    }
}

export default LoginForm