const express = require('express');
const router = express.Router({});
const healthFacilityController = require('../../controllers/healthFacilityController');

const auth = require('../../middleware/auth');

router.route('/:id').get(auth, healthFacilityController.getFacilityById);

module.exports = router;
