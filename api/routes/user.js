//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

module.exports = router;