const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter with explicit SMTP configuration for better Render compatibility
  const transporter = nodemailer.createTransport({
    service:'gmail',

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    
  });

  // Email options
  const mailOptions = {
    from:process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message || error);
    console.error('Email:', process.env.EMAIL);
    console.error('Auth error code:', error.code);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
