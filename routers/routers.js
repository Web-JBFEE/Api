// routes/routes.js

const express = require('express');
const router = express.Router();

// Import controller
const userController = require('../controller/user');
const getAuthId = require('../middleware/getAuthId.js'); // Import JWT middleware

// Definisikan rute-rute
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/profile', getAuthId, userController.getProfile);

module.exports = router;
