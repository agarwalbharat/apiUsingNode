// jshint esversion:6

const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb://localhost:27017/apiUsingNode", {
    useNewUrlParser: true,
});

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // *=>all, or http://adasdas.asdasd
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type,Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.send(200).json({});
    }
    next();
});

app.use("/products", require('./api/routes/products'));
app.use("/orders", require('./api/routes/orders'));
app.use("/user", require('./api/routes/user'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3000, function () {
    console.log("Website located at http://localhost:3000");
});