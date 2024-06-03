let express = require('express');
let productRouter = express.Router({});
let ProductDataModel = require('../../DataModels/ProductDataModel');

productRouter.post('/api/createProduct', (req, res) => {
  ProductDataModel.findOne({ name: req.body.name, desc: req.body.desc })
    .then((foundProduct) => {
      if (foundProduct) {
        res.send(foundProduct);
      } else {
        // create new product
        let newProduct = new ProductDataModel(req.body);

        newProduct
          .save()
          .then((newProduct) => {
            console.log('Product created successfully ', newProduct);
            res.send(newProduct);
          })
          .catch((err) => {
            console.log('Error in creating new product ', err);
            res.send('Error creating new product.');
          });
      }
    })
    .catch((err) => {
      res.send('An error occurred while fetching a product.');
    });
});

productRouter.get('/api/products', (req, res) => {
  ProductDataModel.find()
    .then((allProucts) => {
      res.send(allProucts);
    })
    .catch((err) => {
      console.log('An error occurred while fetching all products.', err);
    });
});

productRouter.get('/api/:id', (req, res) => {
  ProductDataModel.findOne({ _id: req.params.id })
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log('An error occurred while fetching product.', err);
    });
});

module.exports = productRouter;
