const express = require('express');
const { userAuthenticated, checkForAdmin } = require('../utils/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/save', userController.saveUser);
router.post('/auth', userController.authUser);
router.get('/get', userAuthenticated, userController.findUser);

module.exports = router;