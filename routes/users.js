const express = require('express');
const router = express.Router();
const { Validator }  = require("express-json-validator-middleware")

const API   = require('../utils/apiAuth');

const { validate } = new Validator();

/**
 * Define a user JSON schema.
 */
 const createUserSchema = {
    type: "object",
    required: ["username"],
    properties: {
        username: {
            type: "string"
        }
    },
};

// controllers
const users_controller   = require('../controllers/usersController');

/* users */
router.get('/', API.authenticateKey, users_controller.get_users)
router.post('/', validate({ body: createUserSchema }), users_controller.create_user)

module.exports = router;