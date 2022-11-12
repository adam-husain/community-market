const router = require('express').Router();
const Product = require('../models/product.model');
const mongoose = require("mongoose");

router.route('/all').get(allProducts);
router.route('/new').post(newProduct);


function allProducts(req, res) {
	console.log('Incoming: Product All');
	Product.find({hidden: false})
		.then(products => res.json({status: 1, result:products}))
		.catch(err => res.status(400).json({status:0, result: err}));
}

function newProduct(req, res) {
	const body = req.body;
	console.log('Incoming: Product New');
	console.log(body);
	
	const title = body.title;
	const description = body.description;
	const residence = body.residence;
	const price = parseFloat(body.price).toFixed(2);
	const seller = new mongoose.mongo.ObjectId(body.seller);
	const newProd = new Product({title, description, residence, price, seller});
	
	console.log(newProd);
	newProd.save()
		.then(prod => res.json({status: 1, result: prod}))
		.catch(err => res.status(400).json({status: 0, result: err}));
}

module.exports = router;