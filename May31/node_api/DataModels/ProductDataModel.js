let mongooseObj = require('mongoose');

schemaObj = mongooseObj.Schema;

mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let productSchema = new schemaObj({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  rating: Number,
  image: String,
});

let ProductModel = mongooseObj.model('product', productSchema);
console.log(ProductModel);

module.exports = ProductModel;
