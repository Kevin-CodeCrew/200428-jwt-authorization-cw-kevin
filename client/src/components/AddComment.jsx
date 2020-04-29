
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentUser: "",
            commentTitle: "",
            commentsBody: "",
            redirect: false
        }
    }


    // Handle changes to form fields
    handleChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value });
        // console.log(`Changed: ${evt.target.id} ${evt.target.value}`);
    };

    // handle form submission
    handleSubmission = async (event) => {
        event.preventDefault();


        // object for form submission
        let formSubmission = {
            commentUser: this.props.tokenUser.name,
            commentTitle: this.state.commentTitle,
            commentsBody: this.state.commentsBody
        }

        console.log(`PROPS: ${JSON.stringify(this.props)}`);
        console.log(`PAYLOAD: ${JSON.stringify(formSubmission)}`);

        // add document via api endpoint
        let response = await fetch('/users/comment', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify(formSubmission)
        });
        let json = await response.json();
        // console.table(json);
        // Setup for redirect
        if (json.error) {
            // console.table(json);
            // this.setState({ commentArray: [] });
            window.alert(json.error)
        }
        this.setState({ redirect: true })
    }

    // display title, form, and all characters
    render() {
        if (this.state.redirect) {
            return (<Redirect to="/comments" />)
        }
        // Return standard content
        return (
            <div>
                <h3>Add Comment</h3>
                <form>
                    <label htmlFor="commentTitle">Comment Name</label>
                    <input type="text" name="commentTitle" id="commentTitle" value={this.state.commentTitle} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="commentsBody">Comment Body</label>
                    {/* <input type="textArea" rows={5} name="commentsBody" id="commentsBody" value={this.state.commentsBody} onChange={this.handleChange} /> */}
                    <textarea rows={3} name="commentsBody" id="commentsBody" value={this.state.commentsBody} onChange={this.handleChange} />
                    <br />
                    <button onClick={this.handleSubmission}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddComment;