const router = require('express').Router();
const mongoose = require("mongoose");
let Chat = require('../models/chat.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

router.route('/:chatId').get(getChat);
router.route('/all').post(allChat);
router.route('/new').post(newChat);
router.route('/send').post(sendChat);
router.route('/delete').post(deleteChat);


async function getChat(req, res) {
	const chatId = req.params.chatId;
	let chat = await Chat.findOne({_id: chatId});
	const product = await Product.findOne({_id: chat.product})
	const seller = await User.findOne({_id: product.seller});
	const buyer = await User.findOne({_id: chat.buyer});
	chat = {
		_id: chat._id,
		chatSession: chat.chatSession,
		messages: chat.messages,
		visible: chat.visible,
		createdAt: chat.createdAt,
		updatedAt: chat.updatedAt,
		product, seller, buyer
	};
	res.json({status: true, result: chat});
}

async function allChat(req, res) {
	const body = req.body;
	const chatSession = body.chatSession;
	const userId = body.userId;
	
	const myProducts = await Product.find({seller: userId}, {_id: 1});
	let myProductIds = [];
	myProducts.map((i) => myProductIds.push(i._id));
	const filter = {
		$or: [
			{chatSession},
			{product: {$in: myProductIds}}
		],
		visible: true
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
		res.json({status: true, result: existing._id})
		return;
	}
	
	const productObj = await Product.findOne({_id: product});
	const message = '!System Generated! I am interested in your item: ' + productObj.title;
	const messages = [{message, sender: buyer}]
	const newChat = new Chat({chatSession, product, buyer, messages});
	
	const result = await newChat.save();
	res.json({status: true, result: result._id});
}

async function sendChat(req, res) {
	const body = req.body;
	
	const chatSession = body.chatSession;
	const message = body.message;
	const sender = body.sender;
	
	const response = await Chat.updateOne({chatSession}, {$push: {messages: {message, sender}}, visible: true});
	console.log(response);
	res.json({status: true, result: response});
}

async function deleteChat(req, res) {
	const body = req.body;
	const _id = body.id;
	const response = await Chat.updateOne({_id}, {visible: false});
	res.json({status: true, result: response});
}

module.exports = router;