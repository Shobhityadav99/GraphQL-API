exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ 
            _id : '1',
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
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post created Successfully!!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Shobhit'
            },
            createdAt: new Date()
        }
    })
}