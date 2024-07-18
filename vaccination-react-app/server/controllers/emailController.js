const nodemailer = require("nodemailer");
const Appointment = require("../models/Appointment");

const emailSend = async (req, res) => {
  // find appointment info
  const appointment = await Appointment.findOne({ apptId: req.body.id });

  if (!appointment) {
    return res.status(204).json({ message: "No appointment found to update." });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.APP_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  let subjectText = "";
  let messageText = "";

  switch (appointment.status) {
    case "Vaccinated":
      subjectText = `Vaccination Appointment Update`;
      messageText = `Our records indicate your vaccination status is ${
        appointment.status
      } in
        regards to the following vaccine information: ${
          appointment.vaccine.name
        } received on ${appointment.appointmentDate
        .toUTCString()
        .substring(0, 16)} at ${appointment.appointmentTime} AM.
        
        
        Thanks,
         ⛨ Shield Team`;
      break;
    case "Cancel":
      console.log(appointment.appointmentDate.toDateString());
      console.log(appointment.appointmentDate.toUTCString().substring(0, 16));
      subjectText = `Vaccination Appointment Update`;
      messageText = `Your vaccination appointment scheduled for ${appointment.appointmentDate
        .toUTCString()
        .substring(0, 16)} at ${appointment.appointmentTime} AM has been ${
        appointment.status
      } for the following vaccination: ${appointment.vaccine.name} at ${
        appointment.healthFacility.name
      }, ${
        appointment.healthFacility.address
      }.  Please reschedule at your convenience.
      
      Thanks,
        ⛨ Shield Team`;

      break;
    case "Approve":
      subjectText = `Vaccination Appointment Update`;
      messageText = `Your vaccination appointment scheduled for ${appointment.appointmentDate
        .toUTCString()
        .substring(0, 16)} at ${appointment.appointmentTime} AM has been ${
        appointment.status
      } for the following vaccination: ${appointment.vaccine.name} at ${
        appointment.healthFacility.name
      }, ${appointment.healthFacility.address}.
      
      
      Thanks,
        ⛨ Shield Team`;
      break;

    default:
      subjectText = `Vaccination Appointment Update`;
      messageText =
        "Please contact your primary doctor.   Thanks,  ⛨ Shield Team";
      break;
  }

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
    console.log("info: ", info);
    res.json({ message: "Email sent successfully" });
  });
};

module.exports = { emailSend };
