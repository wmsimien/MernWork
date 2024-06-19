let express = require('express');
let cartRouter = express.Router({});
let CartDataModel = require('../../DataModels/CartDataModel');

cartRouter.post('/api/createCart', (req, res) => {
  console.log(req.body);

  CartDataModel.findOne({
    'user._id': req.body.user._id,
    status: 'open',
  })
    .then((foundCart) => {
      if (foundCart) {
        console.log('Cart exists. ', foundCart);

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
        });
      } else {
        // create new create and then add product
        let newCart = new CartDataModel({
          user: req.body.user,
          products: req.body.cart,
        });
        console.log('Cart created successfully ', newCart);
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

cartRouter.post('/api/userCart', (req, res) => {
  console.log('cart user: ', req.body);
  console.log('cart user: ', req.body._id);
  CartDataModel.find({
    'user._id': req.body._id,
    status: 'open',
  })
    .then((allCartItems) => {
      res.send(allCartItems);
    })
    .catch((err) => {
      console.log('An error occurred while fetching all items in cart.', err);
    });
});
cartRouter.post('/api/updateCart', (req, res) => {
  console.log('cartRouter for updating shopping cart: ', req.body);

  CartDataModel.updateOne(
    { 'user.userName': req.body.user.userName, status: 'open' },
    {
      $set: { products: req.body.cart },
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send('An error occurred while updating shopping cart.', err);
    });
});

cartRouter.get('/api/cart/item/:id', (req, res) => {
  console.log('get cart item/product by id: ', req.params.id);
  // CartDataModel.findOne({ _id: req.params.id })
  //   .then((found) => {
  //     res.send(found);
  //   })
  //   .catch((err) => {
  //     console.log('An error occurred while fetching product.', err);
  //   });
});

cartRouter.put('/api/cart/:id', (req, res) => {
  console.log(
    'set cart status to close as payment has bee applied: ',
    req.params.id
  );
  CartDataModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: 'closed' } }
  )
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log('An error occurred while fetching product.', err);
    });
});

module.exports = cartRouter;
