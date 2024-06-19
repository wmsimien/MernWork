let express = require('express');
let productRouter = express.Router({});
let ProductDataModel = require('../../DataModels/ProductDataModel');

productRouter.post('/api/createProduct', (req, res) => {
  console.log(req.body);

  ProductDataModel.findOne({ name: req.body.name, desc: req.body.desc })
    .then((foundProduct) => {
      if (foundProduct) {
        console.log('Product exists. ', foundProduct);
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

productRouter.get('/api/find/:str', (req, res) => {
  console.log('get product string: ', req.params.str);
  let name = req.params.str.split(',')[0];
  let desc = req.params.str.split(',')[1];
  console.log('name and desc: ', name, desc);

  ProductDataModel.findOne({ name: name, desc: desc })
    .then((found) => {
      console.log('found product:  ', found);
      res.send(found);
    })
    .catch((err) => {
      console.log('An error occurred while fetching product.', err);
    });
});

productRouter.put('/api/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  ProductDataModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
      },
    }
  )
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log('An error occurred while fetching product.', err);
    });
});

module.exports = productRouter;
