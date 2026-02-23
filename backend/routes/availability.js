const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/authMiddleware');
const availabilityController = require('../controllers/availabilityController')
router.post('/',verifyToken, availabilityController.saveAvailability)
router.get('/all',verifyToken, availabilityController.getAllAvailabilityOfMe)
router.get("/me/:matchId", verifyToken, availabilityController.getMyAvailability);
router.get("/:matchId",verifyToken, availabilityController.findFirstCommonSlot);
module.exports=router