const express = require('express');
const router = express.Router();
const { Validator }  = require("express-json-validator-middleware")

const API = require('../utils/apiAuth');

const { validate } = new Validator();

/**
 * Define a orderItem JSON schema.
 */
 const orderItemSchema = {
    type: "object",
    required: ["orderItemId", "quantity"],
    properties: {
        orderItemId: {
            type: "string"
        },
        quantity: {
            type: "string"
        }
    }
};

// controllers
const ordersController = require('../controllers/ordersController');

/* orders */
router.get('/:orderId', API.authenticateKey, ordersController.get_order)
router.post('/', API.authenticateKey, ordersController.create_order)

/* order-lines */
router.post('/:orderId/line', API.authenticateKey, validate({ body: orderItemSchema }), ordersController.add_order_line)

module.exports = router;