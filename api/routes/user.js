//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
    userModel.find({
        email: req.body.email
    }).exec().then(doc => {
        if (doc.length >= 1) {
            return res.status(409).json({
                message: "User already exist"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new userModel({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                    });
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User Created",
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                        });
                    });
                }
            });
        }
    });
});


router.post('/login', (req, res, next) => {
    userModel.find({
        email: req.body.email
    }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Authorization failed"
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, function (err, resp) {
                if (err) {
                    return res.status(401).json({
                        message: "Authorization failed"
                    });
                }
                if (resp) {
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, 'bharat', {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        message: 'Auth Success',
                        token: token,
                    });
                } else {
                    return res.status(401).json({
                        message: "Authorization failed",
                    });
                }
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
});

module.exports = router;