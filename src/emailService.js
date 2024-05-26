// emailService.js
const nodemailer = require('nodemailer');

// Konfigurer din e-mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Du kan bruge andre e-mail tjenester
  auth: {
    user: 'webshop.backend@gmail.com',
    pass: 'Ali292003'
  }
});

// Funktion til at sende e-mail
const sendThankYouEmail = (toEmail, orderDetails) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: toEmail,
    subject: 'Tak for din ordre!',
    text: `Tak for din ordre. Her er dine ordredetaljer: ${orderDetails}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendThankYouEmail;
