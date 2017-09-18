'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap

router.post('/', require('./handler/create-folder'))
router.get('/:id/items', require('./handler/find-items'))

module.exports = router