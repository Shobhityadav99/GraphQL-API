const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({message: "User created Successfully", userId : result._id})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            const error = new Error("A user with this email could not be found");
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(user.password,password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error("Incorrect Password");
            error.statusCode = 401;
            throw error;
        }
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}