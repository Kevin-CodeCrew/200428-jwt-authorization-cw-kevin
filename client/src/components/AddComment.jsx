
import React, { Component } from 'react';

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentTitle : "",
            commentsBody : "",
        }
    }

    // handle form input
    handleChange = (event) => {
        if(event.target.name == "commentTitle"){
            this.setState({commentTitle : event.target.value});
        } else if(event.target.name === "commentsBody"){
            this.setState({commentsBody : event.target.value});
        }
    }

    // handle form submission
    handleSubmission = async (event) => {
        event.preventDefault();
        // console.table(this.state);

        // object for form submission
        let formSubmission = {
            commentTitle : this.state.commentTitle,
            commentsBody : this.state.commentsBody
        }
        
        // add document via api endpoint
        let response = await fetch('/api', {
            method : "POST",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(formSubmission)
        });
        let json = await response.json();
        console.table(json);
    }

    // display title, form, and all characters
    render() {
        return (
            <div>
                <h1>Add Comment</h1>
                <form>
                    <label htmlFor="commentTitle">Comment Name</label>
                    <input type="text" name="commentTitle" id="commentTitle" value={this.state.commentTitle} onChange={this.handleChange} />
                    <br />

                    <label htmlFor="commentsBody">Comment Body</label>
                    <input type="text" name="commentsBody" id="commentsBody" value={this.state.commentsBody} onChange={this.handleChange} />

                    <br/>
                    <button onClick = {this.handleSubmission}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddComment;