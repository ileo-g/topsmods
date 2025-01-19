// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You may use other email services
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-email-password' // Your email password or application-specific password
    }
});

// Route to handle mod upload
app.post('/upload-mod', (req, res) => {
    const { modName, modDescription, modTags } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: 'New Mod Uploaded',
        text: `A new mod has been uploaded:\n\nName: ${modName}\nDescription: ${modDescription}\nTags: ${modTags}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});