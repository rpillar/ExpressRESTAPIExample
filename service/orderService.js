const { v4: uuidv4 } = require('uuid');

const Orders = require('../utils/initialData').orders
const OrderLines = require('../utils/initialData').orderLines

/*
  Create a new Order
*/
exports.createOrder = (_userId) => {
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
exports.createOrderLine = (orderId, item, quantity, orderIndex) => {
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
exports.getOrderData = (orderId) => {
    let order = Orders.filter((order) => order._id == orderId)
    if (order === undefined) {
        return undefined
    }

    let oLines = OrderLines.filter((line) => line.orderId == orderId)
    
    return {order: order, lines: oLines }
}

/*
  Find the order index
*/
exports.findOrderIndex = (orderId) => {
    let orderIndex = Orders.findIndex((o) => o._id == orderId)   
    
    return orderIndex
}