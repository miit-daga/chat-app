const express = require('express');
const { validateForm } = require('../controllers/validateForm.js');
const router = express.Router();
const { getLogin, postLogin, handleRegister } = require('../controllers/authController.js');

router.get('/login', getLogin);

router.post('/login', validateForm, postLogin);

router.post('/register', validateForm, handleRegister);

module.exports = router;
