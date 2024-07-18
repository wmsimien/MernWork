const express = require('express');
const router = express.Router({});

const authController = require('../../controllers/authController');

router.route('/').post(authController.login);
router.route('/refresh').get(authController.refresh);
router.route('/logout').post(authController.logout);
router.route('/loggedIn').get(authController.loggedIn);

module.exports = router;
