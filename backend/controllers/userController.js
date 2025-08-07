const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up
const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
 
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, Email, and Password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword 
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//Login
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.ACCESS_SECRET_TOKEN,
        {
            expiresIn: "1h"
        });

        res.cookie("access_user_token", token, {
            httpOnly: true,
        }).status(200).json({ message: "Login successful", token, user });

    } catch (err) {
        next(err);
    }
};

//Logout
const logOut = async (req, res, next) => {
    try {
        res.clearCookie("access_user_token", { 
            httpOnly: true,
            secure: true
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = { signUp, login, logOut };
