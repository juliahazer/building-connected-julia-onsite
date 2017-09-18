'use strict'

const find = require('../query/find')

module.exports = (req, res, next) => {
	const query = {
		projectId: req.query.projectId,
		parentId: req.query.projectId, // user projectId for root folder
	}

	find(query)
		.then(items => res.json(items))
		.catch(next)
}