const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First Post',
            content: 'Content of first post!',
            imageUrl: 'images/sample.png',
            creator: {
                name: 'Shobhit'
            },
            createdAt: new Date()
        }]
    })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation Failed, Entered data is incorrect',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/sample.png',
        creator: {
            name: 'Shobhit'
        },
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post created Successfully!!',
            post: result
        })
    }).catch(err => console.log(err));
}