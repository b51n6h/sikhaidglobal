const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Contact Form Email
exports.sendContactEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({success: false, error: 'Method not allowed'});
    }

    const {name, email, subject, message} = req.body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({success: false, error: 'Missing required fields'});
    }

    try {
      // Send email to info@sikhaidglobal.org
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@sikhaidglobal.org',
        subject: `New Contact Form: ${subject}`,
        html: `
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: email,
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'We received your message - Sikh Aid Global',
        html: `
          <h2>Thank you, ${name}!</h2>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p>Best regards,<br>Sikh Aid Global Team</p>
        `,
      });

      res.status(200).json({success: true, message: 'Email sent successfully'});
    } catch (error) {
      console.error('Email send error:', error);
      res.status(500).json({success: false, error: 'Failed to send email'});
    }
  });
});

// Donor Registration Email
exports.sendDonorEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({success: false, error: 'Method not allowed'});
    }

    const {name, email, phone, country} = req.body;

    if (!name || !email) {
      return res.status(400).json({success: false, error: 'Missing required fields'});
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@sikhaidglobal.org',
        subject: `New Donor Registration - ${name}`,
        html: `
          <h2>New Donor Registration</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Country:</strong> ${country || 'Not provided'}</p>
        `,
        replyTo: email,
      });

      res.status(200).json({success: true, message: 'Donor registration email sent'});
    } catch (error) {
      console.error('Donor email error:', error);
      res.status(500).json({success: false, error: 'Failed to send email'});
    }
  });
});

// Volunteer Registration Email
exports.sendVolunteerEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({success: false, error: 'Method not allowed'});
    }

    const {name, email, phone, skills} = req.body;

    if (!name || !email) {
      return res.status(400).json({success: false, error: 'Missing required fields'});
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@sikhaidglobal.org',
        subject: `New Volunteer Registration - ${name}`,
        html: `
          <h2>New Volunteer Registration</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Skills/Expertise:</strong> ${skills || 'Not provided'}</p>
        `,
        replyTo: email,
      });

      res.status(200).json({success: true, message: 'Volunteer registration email sent'});
    } catch (error) {
      console.error('Volunteer email error:', error);
      res.status(500).json({success: false, error: 'Failed to send email'});
    }
  });
});
