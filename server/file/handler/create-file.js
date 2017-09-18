'use strict'

const createFile = require('../command/create-file')
const findById = require('../query/find-by-id')
const _ = require('lodash')

module.exports = (req, res, next) => {
	const data = {
		projectId: req.query.projectId,
		parentId: req.query.parentId || req.query.projectId, // use projectId for root folder
		key: req.file.key,
		name: req.file.originalname,
		size: req.file.size,
	}

	createFile(data)
		.then(createdFile => findById(createdFile._id))
		.then(file => res.json(file))
		.catch(e => {
			console.error(e)
			next(e)
		})
}
