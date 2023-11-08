const express = require('express');
const router = express.Router();
const { Validator }  = require("express-json-validator-middleware")

const API = require('../utils/apiAuth');
const ValidationSchema = require('../validation/orders')

const { validate } = new Validator();

// controllers
const ordersController = require('../controllers/ordersController');

/* orders */
router.get('/:orderId', API.authenticateKey, ordersController.get_order)
router.post('/', API.authenticateKey, ordersController.create_order)
router.post('/:orderId/cancel', API.authenticateKey, ordersController.cancel_order)

/* order-lines */
router.delete('/:orderId/line/:orderItemId', API.authenticateKey, ordersController.remove_order_line)
router.post('/:orderId/line', API.authenticateKey, validate({ body: ValidationSchema.orderItemSchema }), ordersController.add_order_line)

module.exports = router;