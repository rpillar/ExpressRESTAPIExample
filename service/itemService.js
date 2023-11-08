const Items  = require('../utils/initialData').items

/*
  Find item data
*/
exports.findItem  = (orderItemId) => {
    let item = Items.find((i) => i._id == orderItemId)

    return item
}