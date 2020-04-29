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
            tokenUser: {
                name: ""
            }
        }
    }

    // logout the user by removing the jwt token from state
    logOutUser = () => {
        this.setState({ token: "" });
    }

    // TODO: Use for all subsequent requests
    // when form is submitted read user from database
    logInUser = async (token) => {
        // fetch server endpoint 
        this.setState({ token: token });

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
        this.setState({ tokenUser: json.message });
        console.log(`THN: ${JSON.stringify(this.state)}`);
    }

    render() {
        if (this.state.token) {
            return (
                <Fragment>
                    <h1>Comment Manager</h1>
                    <h4>Welcome {this.state.tokenUser.name}</h4>
                    <Router>
                        <Link to="/">Home</Link> |
                        <Link to="/" onClick={this.logOutUser}>Logout</Link> |
                        <Link to="/comments" >Your Comments</Link> |
                        <Link to="/add" >Add Comment</Link>
                        <hr size="3" />
                        {/* <Route path="/comments"> <ReadComments /> </Route> */}
                        <Route path="/comments" component={() => <ReadComments token={this.state.token} />} />
                        {/* <Route path="/add"> <AddComment /> </Route> */}
                        <Route path="/add" component={() => <AddComment token={this.state.token} tokenUser={this.state.tokenUser} />} />
                    </Router>

                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <h1>Comment Manager</h1>
                    <Router>
                        {/* <Link to="/">Home</Link> | */}
                        <Link to="/login">Login</Link> |
                    <Link to="/register">Registration</Link>
                        <hr size="3" />
                        {/* <Link to="/comments" >Comments</Link> */}

                        {/* <Route path="/comments" component={() => <ReadComments token={this.state.token}/>} /> */}
                        <Route path="/login" component={() => <Login logInUser={this.logInUser} />} />
                        <Route path="/register" component={Register} />
                    </Router>

                </Fragment>
            )
        }
    }
}
export default AppContainer;