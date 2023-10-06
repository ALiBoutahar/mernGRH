const express = require("express");
const nodemailer = require('nodemailer');
const sendRoutes = express.Router();

require("dotenv").config({ path: "./config.env" });
const pass = process.env.PASS;

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploads in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

sendRoutes.post('/send-email', upload.single('attachment'), async (req, res) => {
  try {
    const { subject, message } = req.body;
    const attachment = req.file;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ali27karam09@gmail.com',
        pass: `${pass}`, // Use your actual password securely, perhaps from environment variables
      },
    });

    const mailOptions = {
      from: 'ali27karam09@gmail.com',
      to: 'ali99boutahar@gmail.com',
      subject,
      text: message,
      attachments: attachment
        ? [{ filename: attachment.originalname, path: attachment.path }]
        : [],
    };
    await transporter.sendMail(mailOptions);
    // res.status(200).json({ message: 'Email sent successfully' });
    res.render("send", { statuts: "Email sent successfully" , color: "success" });
    // console.log(attachment);

  } catch (error) {
    // console.error('Error sending email:', error);
    res.render("send", { statuts: "Error sending email", color: "danger"  });
    res.status(500).json({ error: `Error sending email (${error.message})` });
  }
});

module.exports = sendRoutes;