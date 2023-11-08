const { v4: uuidv4 } = require('uuid');

const Orders = require('../utils/initialData').orders
const OrderLines = require('../utils/initialData').orderLines

/*
  Cancel an order
*/
exports.cancelOrder = (orderIndex) => {
    Orders[orderIndex].cancelled = true

    return Orders[orderIndex]
}

/*
  Create a new Order
*/
exports.createOrder = (userId) => {
    let today = new Date().toISOString().split('T')[0];
    let order = {
      _id: uuidv4(),
      userId: userId,
      date: today,
      lines: 0,
      paid: false,
      fulfilled: false,
      cancelled: false
    };
  
    Orders.push(order);
    return order;
};

/*
  Create an OrderItem
*/
exports.createOrderLine = (orderId, item, quantity, orderIndex) => {
    let orderLine = {
      _id: uuidv4(),
      orderId: orderId,
      item: {
          id: item.id,
          quantity: quantity
      }
    };
  
    OrderLines.push(orderLine);

    // update line count on the order
    Orders[orderIndex].lines += 1

    return orderLine;
};

/*
  Find the Order index
*/
exports.findOrderIndex = (orderId) => {
    let orderIndex = Orders.findIndex((o) => o._id == orderId)   
    
    return orderIndex
}

/*
  Find the OrderLines index
*/
exports.findOrderItemIndex = (orderItemId) => {
    let orderItemIndex = OrderLines.findIndex((ol) => ol._id == orderItemId)   
    
    return orderItemIndex
}

/*
  Get order data
*/
exports.getOrderData = (orderId) => {
    let order = Orders.filter((order) => order._id == orderId)
    if (order === undefined) {
        return undefined
    }

    let oLines = OrderLines.filter((line) => line.orderId == orderId)
    
    return {order: order, lines: oLines }
}

/*
  Remove an item from an order
*/
exports.removeOrderItem = (orderIndex, orderItemIndex) => {
    let orderItem = OrderLines.splice(orderItemIndex, 1)

    // update line count on the order
    Orders[orderIndex].lines -= 1

    return
}