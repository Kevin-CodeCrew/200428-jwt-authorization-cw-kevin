import React, { Component, Fragment } from "react";
// import {BrowserRouter as Route, Router, Link } from "react-router-dom";

// class based component to login an existing user from the database via form submission
class Login extends Component {
    constructor(props) {
        super(props);
        // set props of state for controlled component form
        this.state = {
            password: "",
            email: "",
        }
    }

    // controlled component form
    // Handle changes to form fields
    handleChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value });
        // console.log(`Changed: ${evt.target.id} ${evt.target.value}`);
    };

    // when form is submitted read user from database
    handleSubmission = async (event) => {
        event.preventDefault(); // keep page from reloading
        console.log(this.state);

        // define object to send to post request
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        // fetch server endpoint 
        let response = await fetch('/users/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        // pull out json from response
        let json = await response.json();
        // log json response from server
        console.log(json.token);
        if (json.error) {
            window.alert(json.error)
        } else {
            this.props.logInUser(json.token);
        }

    }

    // render form
    render() {
        return (
            <Fragment>
                <h3>Login</h3>                
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                    <br />

                    <button onClick={this.handleSubmission}>Login</button>
                </form>
            </Fragment>
        )
    }
}
export default Login;