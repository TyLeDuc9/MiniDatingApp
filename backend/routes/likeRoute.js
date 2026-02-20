const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')
router.post('/', likeController.likeUser)
router.delete('/', likeController.unlikeUser)
module.exports=router