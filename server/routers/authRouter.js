const express = require('express');
const { validateForm } = require('../controllers/validateForm.js');
const router = express.Router();
const pool = require('../db.js');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    validateForm(req, res);
    const potentialLogin = await pool.query("SELECT id,username,passhash FROM users u WHERE u.username = $1", [req.body.username]);

    if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
        if (isSamePass) {
            req.session.user = {
                username: potentialLogin.rows[0].username,
                id: potentialLogin.rows[0].id
            }
            res.json({ loggedIn: true, username:potentialLogin.rows[0].username, message: "User logged in" });

        }
        else {
            //not valid login
            console.log("ERROR!!!!!");
            res.json({ loggedIn: false, message: "Wrong username or password" });
        }
    } else {
        //user not found
        console.log("ERROR!!!!!");
        res.json({ loggedIn: false, message: "Wrong username or password" });
    }
});

router.post('/register', async (req, res) => {
    validateForm(req, res);

    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);

    //register if username is not taken
    if (existingUser.rowCount === 0) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query("INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING username,id", [req.body.username, hashedPassword]);
        req.session.user = {
            username: newUserQuery.rows[0].username,
            id: newUserQuery.rows[0].id
        }
        res.json({ loggedIn: true, username: req.body.username, message: "User registered" })
    } else {
        console.log("ERROR!!!!!");
        res.json({ loggedIn: false, message: "Username taken" });
    }
});
module.exports = router;