// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL, // Verified sender in SendGrid
    subject: `Portfolio Contact: ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('SendGrid error:', err?.response?.body || err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
