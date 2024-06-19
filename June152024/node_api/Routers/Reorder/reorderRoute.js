/*
  Reorder
    User to reorder from recent orders or from cancelled orders
    A Simple process just add the order to your cart and replace or merge whatever is present in cart
*/
let express = require('express');
let reorderRouter = express.Router({});

let RecentOrdersModel = require('../../DataModels/RecentOrdersModel');
let CartDataModel = require('../../DataModels/CartDataModel');

reorderRouter.post('/api/:id', (req, res) => {
  console.log('reorder: ', req.body);
  console.log('reorderId: ', req.params.id);
  console.log('reorder userId: ', req.body.headers.Authorization._id);
  let user = req.body.headers.Authorization;
  console.log('user: ', user);

  RecentOrdersModel.find({
    _id: req.params.id,
  }).then((found) => {
    console.log('recentOrder: ', found);
    console.log('items: ', found[0].items);
    console.log('items: ', found[0].items.length);

    for (let i = 0; i < found[0].items.length; i++) {
      console.log('item: ', found[0].items[i]);
    }

    CartDataModel.findOne({
      'user._id': req.body.headers.Authorization._id,
      status: 'open',
    })
      .then((foundCart) => {
        if (foundCart) {
          console.log('Cart exists. ', foundCart);

          for (let i = 0; i < found[0].items.length; i++) {
            console.log('item: ', found[0].items[i]);

            CartDataModel.findOneAndUpdate(
              {
                'user._id': req.body.headers.Authorization._id,
                status: 'open',
                'products._id': found[0].items[i]._id,
              },
              { $inc: { 'products.$.qty': 1 } }
              //{ $push: { products: found[0].items[i] } }
            ).then((data) => {
              if (data) {
                console.log('found data increase:', data);
                // res.send(data);
              } else {
                CartDataModel.updateOne(
                  {
                    'user._id': req.body.headers.Authorization._id,
                    status: 'open',
                  },
                  { $push: { products: found[0].items[i] } }
                ).then((data) => {
                  console.log('Added item to cart successfully ', data);
                  // res.send(data);
                });
              }
            });
          }
        } else {
          // create new create and then add product
          let newCart = new CartDataModel({
            user: user,
            products: req.body.items,
          });
          console.log('Cart created successfully from reorder.', newCart);
          newCart
            .save()
            .then((newCart) => {
              console.log('Cart created successfully from reorder.', newCart);
              res.send(newCart);
            })
            .catch((err) => {
              console.log('Error in creating new cart from reorder.', err);
              res.send('Error creating new cart from reorder.');
            });
        }
      })
      .catch((err) => {
        res.send('An error occurred while fetching recent order.');
      });
  });
});

module.exports = reorderRouter;

/**
            CartDataModel.findOneAndUpdate(
          {
            'user.userName': req.body.user.userName,
            status: 'open',
            'products._id': req.body.cart._id,
          },
          { $inc: { 'products.$.qty': 1 } }
        ).then((foundItemInCart) => {
          if (foundItemInCart) {
            console.log('foundItemInCard: ', foundItemInCart);
            res.send(foundItemInCart);
          } else {
            console.log('Not foundItemInCard: ', req.body.cart);
            CartDataModel.updateOne(
              { 'user.userName': req.body.user.userName, status: 'open' },
              {
                $push: { products: req.body.cart },
              }
            )
              .then((data) => {
                console.log('Added item to cart successfully ', data);
                res.send(data);
              })
              .catch((err) => {
                res.send(
                  'An error occurred while adding item/product to shopping cart.',
                  err
                );
              });
          }
           */
