const express = require('express');
const { validateForm } = require('../controllers/validateForm.js');
const router = express.Router();
const { getLogin, postLogin, handleRegister, logout } = require('../controllers/authController.js');
const { rateLimiter } = require('../controllers/rateLimiter.js');

router.get('/login', getLogin);

router.post('/login', validateForm, rateLimiter(60, 10), postLogin);

router.post('/register', validateForm, rateLimiter(60, 3), handleRegister);
module.exports = router;
