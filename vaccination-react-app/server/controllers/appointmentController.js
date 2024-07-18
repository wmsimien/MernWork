const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

const ObjectId = require('mongodb').ObjectId;

// create appointment
const createAppointment = async (req, res) => {
  console.log('createAppointment: ', req.body.appointment);
  const {
    client,
    appointmentDate,
    appointmentTime,
    healthFacility,
    vaccine,
    payment,
  } = req.body.appointment;

  if (!client || !appointmentDate || !healthFacility || !vaccine) {
    return res.status(400).json({
      message: 'Complete appointment information must be entered..',
    });
  }

  const appointment = await Appointment.create({
    client,
    appointmentDate,
    appointmentTime,
    healthFacility,
    vaccine,
    payment,
  });
  console.log('appointment created: ', appointment);

  if (appointment) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    let subjectText = `Vaccination Appointment Scheduled`;
    let messageText = `Your vaccination appointment scheduled for ${appointment.appointmentDate
      .toUTCString()
      .substring(0, 16)} at ${appointment.appointmentTime} AM has been ${
      appointment.status
    } for the following vaccination: ${appointment.vaccine.name} at ${
      appointment.healthFacility.name
    }, ${
      appointment.healthFacility.address
    }.  Payment is currently being processed.
      
      
      Thanks,
        ⛨ Shield Team`;

    const mail_configs = {
      from: process.env.APP_USER,
      to: [process.env.APP_USER],
      subject: subjectText,
      text: messageText,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(204).json({
          message: `An error has occured'.`,
        });
      }
      console.log('info: ', info);
      res.json({ message: 'Email sent successfully' });
    });

    res.status(201).json({
      message: `New appointment ${appointment} created successfully.`,
    });
  } else {
    res.status(400).json({ message: 'Invalid appointment data received.' });
  }
};

const getAppointments = async (req, res) => {
  // obtain all appointments
  const appointments = await Appointment.find().lean();

  if (!appointments) {
    return res.status(204).json({ message: 'No appointments found.' });
  }
  res.json(appointments);
};

const updateAppointment = async (req, res) => {
  console.log('updateAppointment', req.body);
  if (!req?.body?.id)
    return res.status(400).json({ message: 'Appt ID required' });

  // find and update
  const appointment = await Appointment.findOneAndUpdate(
    { apptId: req.body.id },
    { $set: { status: req.body.status } }
  );

  if (!appointment) {
    return res.status(204).json({ message: 'No appointment found to update.' });
  }
  res.json(appointment);
};

module.exports = { createAppointment, getAppointments, updateAppointment };
