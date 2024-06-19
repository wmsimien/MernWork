/*
// 12-06-2024 - Review Page
// This should get its reviews from recent orders page
// User should be allowed to give ratings and his comments to each products

// Upon successful submission each product should have a link to show its review

// When user expands product detail we should also see the button to which will take us to its review
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone
*/

let express = require('express');
let reviewOrderItemRouter = express.Router({});

let ReviewOrderItemModel = require('../../DataModels/ReviewOrderItemModel');
let RecentOrdersModel = require('../../DataModels/RecentOrdersModel');

reviewOrderItemRouter.get('/api/:id', (req, res) => {
  console.log('reorder: ', req.body);
  console.log('reorderId: ', req.params.id);

  RecentOrdersModel.find({
    _id: req.params.id,
  })
    .then((found) => {
      console.log('found: ', found);
      res.status(200).send(found);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

reviewOrderItemRouter.post('/api/createItemReview', (req, res) => {
  console.log('item review: ', req.body);
  let newItemReview = new ReviewOrderItemModel(req.body);
  newItemReview
    .save()
    .then((data) => {
      console.log('saved new item review: ', data);
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

reviewOrderItemRouter.get('/api/:id/reviews', (req, res) => {
  console.log('all reviews for item: ', req.params.id);

  ReviewOrderItemModel.find({
    'item._id': req.params.id,
  })
    .then((found) => {
      console.log('found all reviews: ', found);
      res.status(200).send(found);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

module.exports = reviewOrderItemRouter;
