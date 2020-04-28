import React, { Component, Fragment } from "react";
// import {BrowserRouter as Route, Router, Link } from "react-router-dom";

// class based component to create a new user in the database via form submission
class Register extends Component {
    constructor(props) {
        super(props);
        // set props of state for controlled component form
        this.state = {
            name: "",
            password: "",
            email: "",
        }
    }

    // controlled component form
    handleChange = (event) => {
        if (event.target.name === "name") {
            this.setState({ name: event.target.value });
        } else if (event.target.name === "email") {
            this.setState({ email: event.target.value });
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value });
        }
    }

    // when form is submitted create new user in database
    handleSubmission = async (event) => {
        event.preventDefault(); // keep page from reloading
        // console.log(this.state);

        // define object to send to post request
        let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        // fetch server endpoint 
        let response = await fetch('/users/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        // pull out json from response
        let json = await response.json();
        // log json response from server
        console.log(json);
    }
    // render form
    render() {
        return (
            <Fragment>
                <h1>Registration</h1>
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                    <br />

                    <button onClick={this.handleSubmission}>Register</button>
                </form>
            </Fragment>
        )
    }
}
export default Register;