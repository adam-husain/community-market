const router = require('express').Router();
const User = require('../models/user.model');
const crypto = require('crypto');
const sharp = require('sharp');

const multer = require("multer");
const upload = multer({ dest: 'public/profile/' });
router.route('/register').post(upload.single('profilePicture'), register);
router.route('/login').post(login);
router.route('/cookieLogin').post(cookieLogin);
router.route('/checkEmailUnique').post(checkEmailUnique);
// Todo: Update/Remove account

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
	const email = body.email;
	const password = hashPassword(body.password);
	const name = body.name;
	const pronouns = body.pronouns;
	const newUser = new User({email, password, name, pronouns, profilePicture});
	
	newUser.save()
		.then(user => res.json({status: true, result: user}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

async function login(req, res) {
	const body = req.body;
	
	const email = body.email;
	const password = hashPassword(body.password);
	let user;
	try {
		const filter = {email, password};
		const update = {$push: {sessions: {}}};
		const options = {returnDocument: 'after'};
		user = await User.findOneAndUpdate(filter, update, options);
	}
	catch (err) {
		res.status(400).json({status: 0, result: err})
	}
	
	res.json({status: !!user, result: user})
}

function cookieLogin(req, res) {
	const body = req.body;
	
	const session = body.session;
	User.findOne({sessions: {$elemMatch: {_id: session}}})
		.then(user => res.json({status: true, result: user}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

function checkEmailUnique(req, res) {
	const email = req.body.email;
	User.find({email})
		.then(users => res.json({status: users.length === 0, result: {}}))
		.catch(err => res.status(400).json({status: false, result: err}));
}

module.exports = router;