const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/authMiddleware');
const likeController = require('../controllers/likeController')
router.post('/',verifyToken, likeController.likeUser)
router.get("/me",verifyToken, likeController.getMyLikes);
module.exports=router