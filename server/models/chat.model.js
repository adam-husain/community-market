const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		message: {
			type: String
		},
		sender: {
			type: Schema.Types.ObjectId,
			required: false
		},
		read: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)
const ChatSchema = new Schema(
	{
		chatSession: {
			type: String,
			required: true
		},
		product: {
			type: Schema.Types.ObjectId,
			required: true
		},
		buyer: {
			type: Schema.Types.ObjectId,
			required: false
		},
		messages: {
			type: [MessageSchema]
		},
		visible: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Chat', ChatSchema);