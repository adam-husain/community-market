const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
	loginDate: {
		type: Date,
		default: Date.now()
	}
});

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
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
			type: String,
			default: 'Rather not say'
		},
		profilePicture: {
			type: String
		},
		whatsapp: {
			type: String,
			required: false
		},
		sessions: [SessionSchema]
	},
	{
		timestamps: true
	}
);



module.exports = mongoose.model('User', UserSchema);