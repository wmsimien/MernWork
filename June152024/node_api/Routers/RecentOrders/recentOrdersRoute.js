/*
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)

// Make API to Save and Fetch from RecentOrders

// Make a component RecentOrders to Show all previous Orders of current user

// Add a button to Cancel (like) we have remove in CartComponent and then save again, 

// order can be cancelled within 2 days after that it should be marked delivered
*/
let express = require('express');
let recentOrdersRouter = express.Router({});

let RecentOrdersModel = require('../../DataModels/RecentOrdersModel');

recentOrdersRouter.post('/api/createOrder', (req, res) => {
  console.log('createOrder: ', req.body);
  console.log('createOrder for cart: ', req.body[0]._id);
  // console.log('createOrder user: ', req.body[0].user);
  // console.log('createOrder products: ', req.body[0].products);

  let cartOrder = new RecentOrdersModel({
    user: req.body[0].user,
    items: [...req.body[0].products],
  });
  console.log('New Order created', cartOrder);

  cartOrder
    .save()
    .then((cartOrder) => {
      console.log('Cart order created successfully ', cartOrder);
      res.send(cartOrder);
    })
    .catch((error) => {
      console.log('Error in creating cart order ', error);
      res.send('Error creating cart order.');
    });
});

recentOrdersRouter.post('/api/recentOrders', (req, res) => {
  console.log('show all orders for user: ', req.body);
  console.log('show all orders for userId: ', req.body._id);

  RecentOrdersModel.find({
    'user._id': req.body._id,
  })
    .then((allRecentOrders) => {
      res.send(allRecentOrders);
    })
    .catch((error) => {
      console.log(
        "An error occurred while fetching all user's recent orders.",
        error
      );
    });
});

recentOrdersRouter.post('/api/', (req, res) => {
  // console.log('update/put order status to cancel: ', req.body);

  RecentOrdersModel.findOneAndUpdate(
    {
      _id: req.body._id,
      user: req.body.user,
    },
    {
      $set: { status: 'cancelled' },
    },
    {
      returnNewDocument: true,
      new: true,
      includeResultMetadata: true,
      returnDocument: 'after',
    }
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(
        'An error occurred while fetching order to update status.',
        error
      );
    });
});

module.exports = recentOrdersRouter;
