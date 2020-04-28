import React, { Component } from 'react';

class ReadComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentArray : [],
        }
    }

    // load mock data into array
    componentDidMount = () => {
        this.loadData();
    }

    // get all documents from api endpoint
    loadData = async() => {
        const response = await fetch('/api');
        const json = await response.json();
        console.table(json);
        this.setState({commentArray : json});
    }


    // display title, form, and all characters
    render() {
        return (
            <div>
                <h1>Comments</h1>
                <div>
                    {
                        this.state.commentArray.map((comment) => {
                            return(
                                <div key = {comment._id}>
                                    {comment.commentTitle} 
                                    <br/>
                                    {comment.commentsBody} 
                                    <hr/>
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