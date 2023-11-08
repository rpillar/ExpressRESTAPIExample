const express = require('express');
const router = express.Router();
const { Validator }  = require("express-json-validator-middleware")

const API   = require('../utils/apiAuth');
const ValidationSchema = require('../validation/users')

const { validate } = new Validator();

// controllers
const users_controller   = require('../controllers/usersController');

/* users */
router.get('/', API.authenticateKey, users_controller.get_users)
router.post('/', validate({ body: ValidationSchema.createUserSchema }), users_controller.create_user)

module.exports = router;