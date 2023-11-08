/*
 * To generate JSDoc - ./node_modules/.bin/jsdoc ordersController.js
*/

const ItemService = require('../service/itemService');
const OrderService = require('../service/orderService');

/*
  POST order/:orderId/cancel
*/
exports.cancel_order = (req, res) => {
    let orderId = req.params.orderId

    // make sure that the order exists
    let orderIndex = OrderService.findOrderIndex(orderId)
    if (orderIndex == -1) {
        res.status(400).send({ message: "Order NotFound" });
    }

    let order = OrderService.cancelOrder(orderIndex)

    return res.status(200).send(order)
}

/*
  POST orders
*/
exports.create_order = (req, res) => {
    let order = OrderService.createOrder(req.userId);

    res.status(201).send({ data: order });
};

/* 
  GET orders/:orderId
*/
exports.get_order = (req, res) => {
    let orderData = OrderService.getOrderData(req.params.orderId)
    if (orderData === undefined) {
        res.send([])
    }
    res.send(orderData)
};

/*
 * POST orders/:order_id/line
 *
 * @function add_order_line
 * @param {string} orderId The id of the order
 * @param {string} orderItemId The Id of the Order Item (body)
 * @param {int} quantity The item quantity (body)
 * @return A OrderLine object
 *
*/
exports.add_order_line = (req, res) => {
    let orderId = req.params.orderId

    // make sure that the order exists
    let orderIndex = OrderService.findOrderIndex(orderId)
    if (orderIndex == -1) {
        res.status(400).send({ message: "Order NotFound" });
    }

    // make sure the item exists
    let item = ItemService.findItem(req.body.orderItemId)
    if (item === undefined) {
        res.status(400).send({ message: "Order Item NotFound" });
    }

    // make sure that quantity is none zero
    let quantity = parseInt(req.body.quantity)
    if (quantity < 1) {
        res.status(400).send({ message: "Invalid Order Quantity" });
    }

    let orderLine = OrderService.createOrderLine(orderId, item, quantity, orderIndex);

    res.status(201).send(orderLine);
};

/*
  DELETE orders/:orderId/line/:orderItemId
*/
exports.remove_order_line = (req, res) => {
    let orderId = req.params.orderId
    let orderItemId = req.params.orderItemId

    // make sure that the order exists
    let orderIndex = OrderService.findOrderIndex(orderId)
    if (orderIndex == -1) {
        res.status(400).send({ message: "Order NotFound" });
    }
    let orderItemIndex = OrderService.findOrderItemIndex(orderItemId)
    if (orderItemIndex == -1) {
        res.status(400).send({ message: "Order Item NotFound" });
    }

    OrderService.removeOrderItem(orderIndex, orderItemIndex)

    res.status(200).send();
}