let mongooseObj = require('mongoose');

schemaObj = mongooseObj.Schema;

mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let couponSchema = new schemaObj({
  cpnNumber: { type: Number, required: true },
  val: { type: Number, default: 0.0 },
  cartNo: { type: Number },
});

let CouponModel = mongooseObj.model('coupon', couponSchema);
console.log(CouponModel);

module.exports = CouponModel;
