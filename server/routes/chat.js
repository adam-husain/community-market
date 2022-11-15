const router = require('express').Router();
const mongoose = require("mongoose");
let Chat = require('../models/chat.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const {stringify} = require("nodemon/lib/utils");

router.route('/all').post(allChat);
router.route('/new').post(newChat);

async function allChat(req, res) {
	const body = req.body;
	const chatSession = body.chatSession;
	const userId = body.userId;
	
	const myProducts = await Product.find({seller: userId});
	const filter = {
		$or: [
			{chatSession},
			{$in: myProducts['_id']}
		]
	}
	const chats = await Chat.find(filter);
	let result = chats.map(async chat => {
		const product = await Product.findOne({_id: chat.product});
		let seller = await User.findOne({_id: product.seller});
		let buyer = await User.findOne({_id: chat.buyer});
		
		// Prevent null reference error
		if (seller === null) seller = {};
		if (buyer === null) buyer = {};
		
		return {
			_id: chat._id,
			chatSession: chat.chatSession,
			product,
			seller,
			buyer,
			messages: chat.messages
		}
	});
	
	result = await Promise.all(result);
	res.json({status: true, result});
}


async function newChat(req, res) {
	const body = req.body;
	
	const chatSession = body.chatSession;
	const product = body.product;
	const buyer = body.buyer;
	
	// Check if chat session already exists
	const existing = await Chat.findOne({chatSession, product, buyer});
	
	if (existing) {
		console.log('Existing:', existing);
		res.json({status: true, result: existing._id})
		return;
	}
	
	//const messages = [{}] //todo: System generated welcome
	const newChat = new Chat({chatSession, product, buyer});
	
	const result = await newChat.save();
	res.json({status: true, result: result._id});
}

module.exports = router;