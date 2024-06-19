/*
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)

// Make API to Save and Fetch from RecentOrders

// Make a component RecentOrders to Show all previous Orders of current user

// Add a button to Cancel (like) we have remove in CartComponent and then save again, 

// order can be cancelled within 2 days after that it should be marked delivered
*/

const mongoose = require('mongoose');

const recentOrdersSchema = mongoose.Schema(
  {
    user: {},
    items: [{}],
    status: { type: String, default: 'inprocess' }, // status: inprocess, closed, cancelled, delivered
  },
  {
    //add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const RecentOrdersModel = mongoose.model('recentOrders', recentOrdersSchema);
console.log(RecentOrdersModel);

module.exports = RecentOrdersModel;
