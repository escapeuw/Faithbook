const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Sign-up Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, title } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ where: {email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await User.create({ username, email, password: hashedPassword, title });

        res.json({ message: "User registered succesfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;