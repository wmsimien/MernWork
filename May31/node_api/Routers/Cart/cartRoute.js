let express = require('express');
let cartRouter = express.Router({});
let CartDataModel = require('../../DataModels/CartDataModel');

cartRouter.post('/api/createCart', (req, res) => {
  CartDataModel.findOne({ user: req.body.user })
    .then((foundCart) => {
      if (foundCart) {
        CartDataModel.updateOne(
          { user: req.body.user },
          {
            $push: { cart: req.body.cart },
          }
        ).catch((err) => {
          res.send('An error occurred while updating cart.', err);
        });
      } else {
        // create new create and then add product
        let newCart = new CartDataModel(req.body);
        newCart
          .save()
          .then((newCart) => {
            console.log('Cart created successfully ', newCart);
            res.send(newCart);
          })
          .catch((err) => {
            console.log('Error in creating new cart ', err);
            res.send('Error creating new cart.');
          });
      }
    })
    .catch((err) => {
      res.send('An error occurred while fetching cart.');
    });
});

cartRouter.get('/api/cart', (req, res) => {
  CartDataModel.find()
    .then((allCartItems) => {
      res.send(allCartItems);
    })
    .catch((err) => {
      console.log('An error occurred while fetching all items in cart.', err);
    });
});

module.exports = cartRouter;
