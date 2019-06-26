//jshint esversion:6

const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        require: true,
        unique: true,
        match: /[a - z0 - 9!#$ % & '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema);