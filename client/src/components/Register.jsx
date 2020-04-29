import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

// class based component to create a new user in the database via form submission
class Register extends Component {
    constructor(props) {
        super(props);
        // set props of state for controlled component form
        this.state = {
            name: "",
            password: "",
            email: "",
            redirect: false
        }
    }

    // controlled component form
    // Handle changes to form fields
    handleChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value });
        // console.log(`Changed: ${evt.target.id} ${evt.target.value}`);
    };

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

        if (json.error) {
            window.alert(json.error)
        } else {
            this.setState({ redirect: true });
        }
    }
    // render form
    render() {
        return (
            // If redirect flag was set to true, redirect back to home page
            this.state.redirect ? <Redirect to="/"></Redirect> :
                <Fragment>
                    <h3>Registration</h3>
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