const express = require('express');
const router = express.Router({});
const clientsController = require('../../controllers/clientsController');

const auth = require('../../middleware/auth');

router.route('/').post(clientsController.createClient);

router
  .route('/')
  .get(clientsController.getAllClients)
  .delete(clientsController.deleteClient);

router.route('/:id').put(auth, clientsController.updateClient);
router.route('/:id').get(auth, clientsController.getClientById);

router.route('/reports/:category').get(clientsController.getByCategory);

module.exports = router;
