const router = require('express').Router();
const Product = require('../models/product.model');
const mongoose = require("mongoose");
const sharp = require("sharp");

router.route('/').post(oneProduct);
router.route('/all').get(allProducts);

const multer = require("multer");
const upload = multer({ dest: 'public/product/' });
router.route('/new').post(upload.single('picture'), newProduct);
router.route('/edit').post(upload.single('picture'), edit);
router.route('/remove').post(remove);
router.route('/report').post(report);

function oneProduct(req, res) {
	const _id = req.body.id;
	const seller = req.body.seller;
	Product.findOne({_id, seller})
		.then(product => res.json({status: product != null, result: product}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

function allProducts(req, res) {
	Product.find({hidden: false})
		.then(products => res.json({status: true, result:products}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

async function newProduct(req, res) {
	const body = req.body;
	const file = req.file;
	
	let filename = 'default.jpg';
	if (file != undefined) {
		filename = file.filename + '.jpg';
		await sharp(file.path).rotate()
			.jpeg({quality: 80})
			.toFile(file.destination + filename);
		//fs.unlink(file.path, (err) => {console.log(err)}); // remove temp file
	}
	
	const title = body.title;
	const description = body.description;
	const residence = body.residence;
	const price = parseFloat(body.price).toFixed(2);
	const seller = new mongoose.mongo.ObjectId(body.seller);
	const picture = filename;
	const newProd = new Product({title, description, residence, price, seller, picture});
	
	newProd.save()
		.then(prod => res.json({status: true, result: prod}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

async function edit(req, res) {
	const body = req.body;
	const file = req.file;
	
	const _id = body.id;
	const title = body.title;
	const description = body.description;
	const residence = body.residence;
	const price = body.price;
	
	const currentProduct = await Product.findOne({_id});
	if (currentProduct === null || !currentProduct._id) {
		res.json({status: false, result: {}});
		return;
	}
	
	let picture = currentProduct.picture;
	if (file != undefined) {
		picture = file.filename + '.jpg';
		console.log(picture);
		await sharp(file.path).rotate()
			.jpeg({quality: 80})
			.toFile(file.destination + picture);
		//fs.unlink(file.path, (err) => {console.log(err)}); // remove temp file
	}
	
	const response = await Product.updateOne({_id},
		{title, description, residence, price, picture});
	res.json({status: true, result: response});
}

async function remove(req, res) {
	const body = req.body;
	
	const _id = body.id;
	const response = await Product.updateOne({_id}, {hidden: true});
	res.json({status: true, result: response});
}

function report(req, res) {
	res.json({status: true, result: {}})
}

module.exports = router;