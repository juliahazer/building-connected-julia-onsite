'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	dateModified: {
		type: Date,
		default: Date.now,
	},
	key: {
		type: String,
	},
	name: {
		required: true,
		type: String,
	},
	parentId: {
		type: 'ObjectId',
	},
	size: {
		type: Number,
	},
	type: {
		enum: ['FILE', 'FOLDER'],
		required: true,
		type: String,
	},
})

module.exports = mongoose.model('File', schema)
