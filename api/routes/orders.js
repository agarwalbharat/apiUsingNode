//jshint esversion:6

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const orderModel = require("../models/orders.model");
const productModel = require("../models/products.model");

router.get("/", (req, res, next) => {
    orderModel.find({}, {
        __v: 0
    }).exec().then((docs) => { //.select('quantity productID')
        console.log(docs);
        if (docs) {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        productID: doc.product,
                        quantity: doc.quantity
                    };
                })
            };
            res.status(200).json(response);
        } else {
            res.status(400).json({
                message: "No Result Found"
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
});

router.post("/", (req, res, next) => {
    productModel.findById(req.body.productID).exec().then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product Not Found'
            });
        }
        const order = new orderModel({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productID,
            quantity: req.body.quantity
        });
        order.save().then((result) => {
            res.status(201).json({
                message: "Orders created",
                order: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

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