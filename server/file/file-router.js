'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../lib/s3')

const uploader = multer({
	storage: multerS3({
		s3,
		bucket: 'coding-challenges',
		key: (req, file, cb) => {
			const projectId = req.query.projectId
			return cb(null, `/projects/${projectId}/${Date.now()}/${file.originalname}`)
		},
	}),
})

router.get('/', require('./handler/find-root-items')) // special route for root of project

router.post('/', uploader.single('file'), require('./handler/create-file'))
router.get('/:id', require('./handler/find-by-id'))
router.get('/:id/content', require('./handler/download-file'))

module.exports = router