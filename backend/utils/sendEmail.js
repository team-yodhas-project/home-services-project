const sendEmail = async (options) => {
  // Use SendGrid if available (recommended for Render)
  if (process.env.SENDGRID_API_KEY) {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: options.email,
        from: process.env.EMAIL || 'noreply@homeservices.com',
        subject: options.subject,
        html: options.message,
      };
      
      await sgMail.send(msg);
      console.log('Email sent successfully via SendGrid');
      return true;
    } catch (error) {
      console.error('SendGrid error:', error.message);
      throw new Error('Email could not be sent');
    }
  }
  
  // Fallback to Gmail with nodemailer (for local dev)
  try {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully via Gmail');
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
