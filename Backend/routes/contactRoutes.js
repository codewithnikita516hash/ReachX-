const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//  Fetch all contacts
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Create a new contact (POST)
router.post(
    "/contact",
    [
        body("firstName").trim().notEmpty().withMessage("First name is required"),
        body("lastName").trim().notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("phone").trim().notEmpty().withMessage("Phone number is required"),
        body("message").trim().notEmpty().withMessage("Message is required")
    ],
    async (req, res) => {
        console.log("📩 Received contact request:", req.body);

    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { firstName, lastName, email, phone, message } = req.body;
            const newContact = new Contact({ firstName, lastName, email, phone, message });
            await newContact.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: "nikitagingle@gmail.com",
                subject: "New Contact Form Submission",
                text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
            };

            await transporter.sendMail(mailOptions);
            console.log("📧 Email Sent Successfully!");

            res.status(201).json({ message: "✅ Contact saved & email sent successfully!" });
        } catch (error) {
            console.error("❌ Error submitting contact:", error.message);
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;
