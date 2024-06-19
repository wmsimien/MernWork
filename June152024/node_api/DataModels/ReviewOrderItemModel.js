/*
// 12-06-2024 - Review Page
// This should get its reviews from recent orders page
// User should be allowed to give ratings and his comments to each products

// Upon successful submission each product should have a link to show its review

// When user expands product detail we should also see the button to which will take us to its review
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone
*/

const mongoose = require('mongoose');

const revewOrderItemSchema = mongoose.Schema(
  {
    user: {},
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'recentOrders',
    },
    item: {},
    comment: String,
    rating: Number,
  },
  {
    //add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const ReviewOrderItemModel = mongoose.model(
  'reviewOrderItem',
  revewOrderItemSchema
);
console.log(ReviewOrderItemModel);

module.exports = ReviewOrderItemModel;
