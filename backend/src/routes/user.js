const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/userSchema");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Email, password, and name are required"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // const newUser = await User.create({
        //     email,
        //     password: hashedPassword
        // });
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id,
                email: newUser.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "1w"
            }
        );

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                name: newUser.name,
                id: newUser._id,
                email: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;