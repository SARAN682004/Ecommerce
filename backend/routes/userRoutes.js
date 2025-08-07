const express = require('express');
const router = express.Router();
const { signUp, login, logOut } = require('../controllers/userController');

// Sign up route
router.post('/signUp', signUp);

// login route
router.post('/login', login);

// logOut route
router.post('/logout/:id', logOut);

module.exports = router;
