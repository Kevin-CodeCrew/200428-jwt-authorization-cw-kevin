let express = require("express");
let app = express();
let port = 8000;

// CONNECTING TO A MONGO DB DATABASE
// reference the mongoose module 
let mongoose = require('mongoose');
// connect to database
let mongoDB = require('./config/keys').mongoURI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// connection error message
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let users = require("./routes/users");
app.use('/users', users);

let api = require("./routes/api");
app.use('/api', api);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});