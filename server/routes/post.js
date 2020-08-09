'use strict';
const log = console.log;

const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const Post = require('../models/post');
const { mongoChecker, validateId, patch, save, find } = require('./common');

const express = require('express');
const router = express.Router();

// A POST Route for making a post.
// <req.params.posterUsername> is the poster's username.
// <req.body> expects the following format:
// {
//     "title": "Grocery Pickup",
//     "body": "Lorem ipsum dolor",
//     "type": "Request",
//     "date": "July 17, 2020 03:24:00", (or any valid Date string)
//     "status": "active",
//     "location": "M4P"
// }
router.post('/post/:posterUsername', mongoChecker, (req, res) => {
    // Get poster username from <posterUsername> param
    const posterUsername = req.params.posterUsername;
    req.body.posterUsername = posterUsername;

    // Parse date string
    req.body.date = new Date(req.body.date);

    // Create a new post
    const post = new Post(req.body);

    // Save post to the database
    save(req, res, post);
});

// GET route to get all posts
router.get('/posts', mongoChecker, (req, res) => {
    find(req, res, Post);
});

// GET route to get all posts in the location <req.param.location>.
// <req.param.location> is expected to be a postal code prefix, e.g. "M4V"
router.get('/post/location/:location', mongoChecker, (req, res) => {
    Post.find({ location: req.params.location })
        .then((posts) => {
            // If a post is inactive, only return it if the poster is the current user 
            posts = posts.filter(post => {
                if (req.session.username !== post.posterUsername) {
                    return post.status === 'active';
                } else {
                    return true;
                }
            })
            res.send(posts);
        })
        .catch((error) => {
            if (isMongoError(error)) {
                res.status(500).send("Internal server error");
            } else {
                log(error);
                res.status(400).send("Bad Request");
            }
        });
});

// GET route to get all posts with posterUsername <req.param.posterUsername>
router.get('/post/posterUsername/:posterUsername', mongoChecker, (req, res) => {
    find(req, res, Post, { posterUsername: req.params.posterUsername });
});

// PATCH route to update a post
// <req.params.id> is the post's id
// <req.body> will be an array that consists of a list of changes to make to the post.
// [
//   { "op": "replace", "path": "/status", "value": "inactive" }
//   ...
// ]
router.patch('/post/:id', mongoChecker, validateId, (req, res) => { 
    patch(req, res, Post, { _id: req.params.id });
});

module.exports = router;