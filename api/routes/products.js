// jshint esversion:6
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const ProductMo = require('../models/products.model');

router.get("/", (req, res, next) => {
    ProductMo.find({}, {
        __v: 0
    }).exec().then((docs) => {
        console.log(docs);
        if (docs) {
            const response = {
                count: docs.length,
                // product: docs.map(doc => {
                //     return {
                //         name: doc.name,
                //         price: doc.price,
                //         _id: doc._id,
                //         request: {
                //             type: "GET",
                //             url: "http://localhost:3000/product" + doc._id
                //         }
                //     }
                // })
                product: docs
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

    const product = new ProductMo({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Product Added",
            createdProduct: product
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:Pid', (req, res, next) => {
    const id = req.params.Pid;
    ProductMo.findById(id).exec().then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No Valid entry Found'
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete("/:productID", (req, res, next) => {
    const id = req.params.productID;
    ProductMo.remove({
        _id: id
    }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
});

module.exports = router;