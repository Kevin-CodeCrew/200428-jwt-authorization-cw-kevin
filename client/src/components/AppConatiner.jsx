import React, { Component, Fragment } from "react";
import Login from "./Login";
import Register from "./Register";
import ReadComments from "./ReadComments";
import AddComment from "./AddComment";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom' // imports to use Router


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
        }
    }

    logOutUser = () => {
        this.setState({ token: "" });
    }

    // when form is submitted read user from database
    logInUser = async (token) => {
        // fetch server endpoint 
        let response = await fetch('/users/verify', {
            method: "POST",
            headers: {
                'Authorization': token
            },
        });
        // pull out json from response
        let json = await response.json();
        // log json response from server
        // if (json.error) {
        //     window.alert(json.error)
        // }
        console.log(json.message);
        this.setState({ token: json.message });
        console.log(this.state.token);
    }

    render() {
        if (this.state.token) {
            return (
                <Fragment>
                    <h1>Authentication with Passport and JSON Web Tokens</h1>
                    <Router>
                        <Link to="/">Home</Link> |
                        <Link to="/" onClick={this.logOutUser}>Logout</Link> |
                        <Link to="/comments" >Comments</Link> |
                        <Link to="/add" >Add Comment</Link> 

                        <Route path="/comments"> <ReadComments/> </Route>
                        <Route path="/add"> <AddComment/> </Route>
                    </Router>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h1>Authentication with Passport and JSON Web Tokens</h1>
                <Router>
                    <Link to="/">Home</Link> |
                    <Link to="/login">Login</Link> |
                    <Link to="/register">Registration</Link> |
                    <Link to="/comments" >Comments</Link> 

                    <Route path="/comments"> <ReadComments/> </Route>
                    <Route path="/login" component={() => <Login logInUser={this.logInUser} />} />
                    <Route path="/register" component={Register} />
                </Router>
            </Fragment>
        )
    }
}
export default AppContainer;