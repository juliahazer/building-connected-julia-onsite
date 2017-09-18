'use strict'

const createFolder = require('../command/create-folder')
const findById = require('../query/find-by-id')
const _ = require('lodash')

module.exports = (req, res, next) => {
	const data = _.assign(
		{},
		req.body,
		{
			projectId: req.query.projectId,
			parentId: req.query.parentId || req.query.projectId, // use projectId for root folder
		}
	)

	createFolder(data)
		.then(createdFolder => findById(createdFolder._id))
		.then(folder => res.json(folder))
		.catch(next)
}
