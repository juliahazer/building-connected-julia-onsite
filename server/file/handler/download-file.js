'use strict'

const findById = require('../query/find-by-id')
const getS3DownloadUrl = require('../../lib/get-signed-s3-download-url')

module.exports = (req, res, next) => {
	findById(req.params.id)
		.then(item => {
			if (!item.type === 'FILE') {
				throw Error('Item must be of type File')
			}
			res.redirect(getS3DownloadUrl(item.key))
		})
		.catch(next)
}