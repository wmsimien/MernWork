const express = require('express');
const router = express.Router({});
const appointmentController = require('../../controllers/appointmentController');

const auth = require('../../middleware/auth');

router
  .route('/')
  .post(auth, appointmentController.createAppointment)
  .get(auth, appointmentController.getAppointments)
  .put(auth, appointmentController.updateAppointment);

module.exports = router;
