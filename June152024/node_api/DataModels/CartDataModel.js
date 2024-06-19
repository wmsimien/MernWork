let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema;

mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let cartSchema = new schemaObj({
  user: {},
  products: [{}],
  status: { type: String, default: 'open' }, //open, closed
});

let CartModel = mongooseObj.model('cart', cartSchema);
console.log(CartModel);

module.exports = CartModel;
