//jshint esversion:6
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const verifyAndDecode = jwt.verify(req.body.token, 'bharat');
        req.userData = verifyAndDecode;
        console.log(verifyAndDecode);
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Wrong Token"
        })
    }
};