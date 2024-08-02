const pool = require('../db.js');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ loggedIn: true, username: req.session.user.username });
    } else {
        res.json({ loggedIn: false });
    }
}

module.exports.postLogin = async (req, res) => {
    const potentialLogin = await pool.query("SELECT id, username, passhash FROM users u WHERE u.username = $1", [req.body.username]);

    if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash);
        if (isSamePass) {
            req.session.user = {
                username: potentialLogin.rows[0].username,
                id: potentialLogin.rows[0].id
            };
            return res.json({ loggedIn: true, username: potentialLogin.rows[0].username });
        } else {
            console.log("ERROR!!!!!");
            return res.json({ loggedIn: false, errorMessage: "Wrong username or password" });
        }
    } else {
        console.log("ERROR!!!!!");
        return res.json({ loggedIn: false, errorMessage: "Wrong username or password" });
    }
}

module.exports.handleRegister = async (req, res) => {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);

    if (existingUser.rowCount === 0) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query("INSERT INTO users (username, passhash) VALUES ($1, $2) RETURNING username, id", [req.body.username, hashedPassword]);
        req.session.user = {
            username: newUserQuery.rows[0].username,
            id: newUserQuery.rows[0].id
        };
        return res.json({ loggedIn: true, username: req.body.username });
    } else {
        console.log("ERROR!!!!!");
        return res.json({ loggedIn: false, errorMessage: "Username taken" });
    }
}