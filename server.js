const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body; // Form data sent by user

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Gmail service or your email provider
        auth: {
            user: 'techinnovators@mitwpu.edu.in', // Replace with your email
            pass: '1701mitwpu', // Replace with your email app password
        },
    });

    const mailOptions = {
        from: email, // The email address of the user who filled out the form
        to: 'techinnovators@mitwpu.edu.in', // Your email address to receive the form submission
        subject: 'New Form Submission',
        text: `You received a new message from:
        Name: ${name}
        Email: ${email}
        Message: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Form submitted successfully!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
