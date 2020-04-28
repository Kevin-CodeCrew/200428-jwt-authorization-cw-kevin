// import express
let express = require('express');
// create router
let router = express.Router();
// json middleware
router.use(express.json());

let CommentsCollection = require('../models/CommentSchema');

// get all residents
router.get('/', (req,res) => {
    CommentsCollection.find(
        {}, (error, result) => {
            error ? res.send(error) : res.send(result)
        }
    );
});

// create a resident
router.post('/', (req,res) => {
    CommentsCollection.create(req.body, (error, results) => {
        error ? res.send(error) : res.send(results)
    });
});

module.exports = router;