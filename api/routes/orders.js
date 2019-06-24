//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const orderModel = require("../models/orders.model");
const productModel = require("../models/products.model");

const router = express.Router();

router.get("/", (req, res, next) => {
    orderModel.find({}, {
        __v: 0
    }).populate('product', { //.populate to get data from ref which added in model 
        __v: 0
    }).exec().then((docs) => { //.select('quantity productID')
        console.log(docs);
        if (docs) {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
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
    orderModel.findById(req.params.orderID, {
        __v: 0
    }).exec().then(order => {
        console.log(order);
        if (!order) {
            res.status(404).json({
                message: 'No Valid entry Found'
            });
        } else {
            res.status(200).json({
                order
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete("/:orderID", (req, res, next) => {
    const id = req.params.orderID;
    orderModel.remove({
        _id: id
    }).exec().then(result => {
        if (!result) {
            res.status(404).json({
                message: 'No Valid entry Found'
            });
        } else {
            res.status(200).json(result);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
});

module.exports = router;