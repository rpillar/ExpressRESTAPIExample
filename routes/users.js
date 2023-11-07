const express = require('express');
const router = express.Router();

const API   = require('../utils/apiAuth');

// controllers
const users_controller   = require('../controllers/usersController');

/* users */
router.get('/', API.authenticateKey, users_controller.get_users)
router.post('/', users_controller.create_user)

module.exports = router;