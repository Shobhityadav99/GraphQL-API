const mongoose = require('mongoose');
const Post = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        value: "I am New vros!!",
    },
    posts : [{
        type: Schema.Types.ObjectId,
        ref: Post
    }],
});

module.exports = mongoose.model('User',UserSchema);