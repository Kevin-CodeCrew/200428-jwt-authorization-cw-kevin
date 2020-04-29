let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema (
    {
        commentUser :  {required : true, type : String},
        commentTitle : {required : true, type : String},
        commentsBody : {required : true, type : String},
        date : {type : Date, default : Date.now}
    }
);

module.exports = mongoose.model('commentsCW200429', CommentSchema);