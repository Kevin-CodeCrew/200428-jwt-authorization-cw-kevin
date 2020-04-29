import React, { Component } from 'react';

class ReadComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentArray: [],
        }
    }

    // load mock data into array
    componentDidMount = () => {
        this.loadData();
    }

    // get all documents from api endpoint
    loadData = async () => {
        const response = await fetch('/users/comment', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        });

        const json = await response.json();
        if (json.error) {
            console.table(json);
            this.setState({ commentArray: [] });
            window.alert(json.error)
        } else {
            console.table(json);
            this.setState({ commentArray: json });
        }

    }


    // display title, form, and all characters
    render() {
        return (
            <div>
                <h3>Your Comments</h3>
                <div>
                    {
                        this.state.commentArray.map((comment) => {
                            return (
                                <div key={comment._id}>
                                    {comment.commentUser}
                                    <br />
                                    {comment.commentTitle}
                                    <br />
                                    {comment.commentsBody}
                                    <br />
                                    {comment.date}
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ReadComments;