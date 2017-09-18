'use strict'

const model = require('../mongo/model')
const _ = require('lodash')

module.exports = data => {
	return model
		.create(_.assign({ type: 'FILE' }, data))
		.call('toObject')
}