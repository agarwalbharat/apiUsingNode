//jshint esversion:6

const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Orders were fatched"
    });
});

router.post("/", (req, res, next) => {

    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    };

    res.status(201).json({
        message: "Orders were created",
        order: order
    });
});

router.get("/:orderID", (req, res, next) => {
    res.status(200).json({
        message: "Orders Details",
        id: req.params.orderID,
    });
});

router.delete("/:orderID", (req, res, next) => {
    res.status(200).json({
        message: "Orders Deleted",
        id: req.params.orderID,
    });
});

module.exports = router;