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
			default: 'https://myresidence.shop/public/product/default.jpg'
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
			type: Date
		},
		removeReason: {
			type: Number
		}
	}
);

module.exports = mongoose.model('Product', ProductSchema);