const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})

app.use('/feed',feedRoutes);

mongoose.connect(
    'mongodb+srv://shobhit:shobhit@cluster0.eoc3v.mongodb.net/messages?retryWrites=true&w=majority'
).then(result => {
    app.listen(8080);
}).catch(err => {
    console.log(err);
})
