const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	loginDate: {
		type: Date,
		default: Date.now()
	}
});

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minLength: 5,
			maxLength: 10
		},
		password: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true,
			maxLength: 20
		},
		pronouns: {
			type: Number,
			default: 0
		},
		profilePicture: {
			type: String,
			default: 'https://myresidence.shop/public/profile/default.jpg'
		},
		whatsapp: {
			type: String
		},
		sessions: [sessionSchema]
	},
	{
		timestamps: true
	}
);



module.exports = mongoose.model('User', UserSchema);