const router = require('express').Router();
let User = require('../models/user.model');
const crypto = require('crypto');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/cookieLogin').post(cookieLogin);
// Todo: Update/Remove account

function hashPassword(password) {
	return crypto.createHash('sha256').update(password).digest('hex');
}

function register(req, res) {
	const body = req.body;
	console.log('Incoming: User Register');
	console.log(body);
	
	const username = body.username;
	const password = hashPassword(body.password);
	const name = body.name;
	const pronouns = parseInt(body.pronouns);
	const whatsapp = body.whatsapp;
	const newUser = new User({username, password, name, pronouns, whatsapp});
	
	newUser.save()
		.then(user => res.json({status: 1, result: user}))
		.catch(err => res.status(400).json({status: 0, result: err}));
}

async function login(req, res) {
	const body = req.body;
	console.log('Incoming: User Login')
	console.log(body);
	
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
	
	console.log(user);
	res.json({status: user.length == 1, result: user})
}

function cookieLogin(req, res) {
	const body = req.body;
	console.log('Incoming: User CookieLogin')
	console.log(body);
	
	const loginId = body.session;
	User.findOne({sessions: {$elemMatch: {_id: loginId}}})
		.then(user => res.json({status: 1, result: user}))
		.catch(err => res.status(400).json({status: 0, result: err}));
}

module.exports = router;