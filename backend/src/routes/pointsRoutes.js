const express = require('express');
const { getPoints, addPoints, transferPoints, redeemPoints } = require('../controllers/pointsController'); // Ensure these functions exist
const { protect } = require('../middlewares/authMiddleware'); // Ensure this middleware is defined

const router = express.Router();

router.get('/', protect, getPoints); // Ensure 'getPoints' is defined in 'pointsController'
router.post('/add', protect, addPoints); // Ensure 'addPoints' is defined
router.post('/transfer', protect, transferPoints); // Ensure 'transferPoints' is defined
router.post('/redeem', protect, redeemPoints); // Ensure 'redeemPoints' is defined

module.exports = router;
