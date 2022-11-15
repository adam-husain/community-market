const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			maxLength: 20
		},
		description: {
			type: String,
			required: true,
			maxLength: 100
		},
		residence: {
			type: Number,
			default: 0
		},
		price: {
			type: Number,
			default: 0
		},
		picture: {
			type: String,
		},
		seller: {
			type: Schema.Types.ObjectId,
			required: true
		},
		hidden: {
			type: Boolean,
			default: false
		},
		removeDate: {
			type: Date,
			required: false
		},
		removeReason: {
			type: Number,
			required: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Product', ProductSchema);