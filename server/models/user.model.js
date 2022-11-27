const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
	session: {
		type: String,
		default: new mongoose.mongo.ObjectId()
	},
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
		preferWhatsapp: {
			type: Boolean,
			default: false
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