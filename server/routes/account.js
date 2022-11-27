const router = require('express').Router();
const User = require('../models/user.model');
const crypto = require('crypto');
const sharp = require('sharp');

const multer = require("multer");
const upload = multer({ dest: 'public/profile/' });
router.route('/register').post(upload.single('profilePicture'), register);
router.route('/login').post(login);
router.route('/edit').post(upload.single('profilePicture'), edit);
router.route('/cookieLogin').post(cookieLogin);
router.route('/checkUnique').post(checkUnique);

function hashPassword(password) {
	return crypto.createHash('sha256').update(password).digest('hex');
}

async function register(req, res) {
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
	
	const profilePicture = filename;
	const username = body.username;
	const password = hashPassword(body.password);
	const name = body.name;
	const pronouns = body.pronouns;
	const preferWhatsapp = body.preferWhatsapp;
	const whatsapp = body.whatsapp;
	const newUser = new User({username, password, name, pronouns, profilePicture, preferWhatsapp, whatsapp});
	
	newUser.save()
		.then(user => res.json({status: true, result: user}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

async function login(req, res) {
	const body = req.body;
	
	const username = body.username;
	const password = hashPassword(body.password);
	let user;
	try {
		const filter = {username, password};
		const update = {$push: {sessions: {}}};
		const options = {returnDocument: 'after'};
		user = await User.findOneAndUpdate(filter, update, options);
	}
	catch (err) {
		res.status(400).json({status: 0, result: err})
	}
	
	res.json({status: !!user, result: user})
}

async function edit(req, res) {
	const body = req.body;
	const file = req.file;
	
	const _id = body.id;
	const name = body.name;
	const pronouns = body.pronouns;
	const preferWhatsapp = body.preferWhatsapp;
	const whatsapp = body.whatsapp;
	
	const currentUser = await User.findOne({_id});
	if (currentUser === null || !currentUser._id) {
		res.json({status: false, result: {}});
		return;
	}
	
	
	let profilePicture = currentUser.profilePicture;
	if (file != undefined) {
		profilePicture = file.filename + '.jpg';
		await sharp(file.path).rotate()
			.jpeg({quality: 80})
			.toFile(file.destination + profilePicture);
		//fs.unlink(file.path, (err) => {console.log(err)}); // remove temp file
	}
	
	const response = await User.updateOne({_id}, {name, profilePicture, pronouns, preferWhatsapp, whatsapp});
	res.json({status: true, result: response});
}

function cookieLogin(req, res) {
	const body = req.body;
	
	const session = body.session;
	console.log(session);
	User.findOne({sessions: {$elemMatch: {_id: session}}})
		.then(user => res.json({status: user != null, result: user}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

function checkUnique(req, res) {
	const username = req.body.username;
	User.find({username})
		.then(users => res.json({status: users.length === 0, result: {}}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

module.exports = router;