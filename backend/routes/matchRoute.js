const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/authMiddleware');
const matchController = require('../controllers/matchController')
router.get("/me",verifyToken, matchController.getMyMatches);
module.exports=router