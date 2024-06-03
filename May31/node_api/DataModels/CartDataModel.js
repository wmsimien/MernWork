let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema;

let ProductModel = require('./ProductDataModel');

mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let cartSchema = new schemaObj({
  user: { type: String },
  cart: [{ type: String }],
});

let CartModel = mongooseObj.model('cart', cartSchema);
console.log(CartModel);

module.exports = CartModel;
