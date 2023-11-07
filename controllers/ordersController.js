const { v4: uuidv4 } = require('uuid');
/*
 * To generate JSDoc - ./node_modules/.bin/jsdoc ordersController.js
*/

const API    = require('../utils/apiAuth');
const Items  = require('../utils/initialData').items
const Orders = require('../utils/initialData').orders
const OrderLines = require('../utils/initialData').orderLines

/* 
  GET orders/:orderId
*/
exports.get_order = (req, res) => {
    let orderData = _getOrderData(req.params.orderId)
    if (orderData === undefined) {
        res.send([])
    }
    res.send(orderData)
};

/*
  POST orders
*/
exports.create_order = (req, res) => {
    let order = _createOrder(req.userId);

    res.status(201).send({ data: order });
}

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
    let orderIndex = _findOrderIndex(orderId)
    if (orderIndex == -1) {
        res.status(400).send({ message: "Order NotFound" });
    }

    // make sure the item exists
    let item = _findItem(req.body.orderItemId)
    if (item === undefined) {
        res.status(400).send({ message: "Order Item NotFound" });
    }

    // make sure that quantity is none zero
    let quantity = parseInt(req.body.quantity)
    if (quantity < 1) {
        res.status(400).send({ message: "Invalid Order Quantity" });
    }

    let orderLine = _createOrderLine(orderId, item, quantity, orderIndex);

    res.status(201).send();
}

/*
  Private methods
  ===============
*/

/*
  Create a new Order
*/
const _createOrder = (_userId) => {
    let today = new Date().toISOString().split('T')[0];
    let order = {
      _id: uuidv4(),
      userId: _userId,
      date: today,
      lines: 0
    };
  
    Orders.push(order);
    return order;
};

/*
  Create an OrderItem
*/
const _createOrderLine = (orderId, item, quantity, orderIndex) => {
    let orderLine = {
      _id: uuidv4(),
      orderId: orderId,
      item: {
          id: item.id,
          quantity: quantity
      },
      paid: false,
      fulfilled: false
    };
  
    OrderLines.push(orderLine);

    // update line count on the order
    Orders[orderIndex].lines =+ 1

    return orderLine;
};

/*
  Get order data
*/
const _getOrderData = (orderId) => {
    let order = Orders.filter((order) => order._id == orderId)
    if (order === undefined) {
        return undefined
    }

    let oLines = OrderLines.filter((line) => line.orderId == orderId)
    
    return {order: order, lines: oLines }
}

/*
  Find item data
*/
const _findItem  = (orderItemId) => {
    let item = Items.find((i) => i._id == orderItemId)

    return item
}

/*
  Find the order index
*/
const _findOrderIndex = (orderId) => {
    let orderIndex = Orders.findIndex((o) => o._id == orderId)   
    
    return orderIndex
}