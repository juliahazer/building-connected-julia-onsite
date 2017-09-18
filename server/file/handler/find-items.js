'use strict'

const find = require('../query/find')

module.exports = (req, res, next) => {
	const query = {
		projectId: req.query.projectId,
		parentId: req.params.id,
	}

	find(query)
		.then(items => res.json(items))
		.catch(next)
}
