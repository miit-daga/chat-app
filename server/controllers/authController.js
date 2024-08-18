const pool = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../redis.js');
const { jwtSign, jwtVerify, getJWT } = require('./jwtAuth.js');
require('dotenv').config();

module.exports.getLogin = async (req, res) => {
    try {
        const token = getJWT(req);
        if (!token) {
            return res.status(401).json({ loggedIn: false, errorMessage: "Token not provided" });
        }
        const decoded = await jwtVerify(token, process.env.JWT_SECRET);
        const potentialLogin = await pool.query("SELECT username FROM users WHERE id = $1", [decoded.id]);
        if (potentialLogin.rowCount === 0) {
            return res.status(400).json({ loggedIn: false, errorMessage: "User not found" });
        }
        res.json({ loggedIn: true, token, username: potentialLogin.rows[0].username });
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(401).json({ loggedIn: false, errorMessage: "Invalid token" });
    }
};
module.exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const potentialLogin = await pool.query("SELECT id, username, passhash, userId FROM users WHERE username = $1", [username]);

        if (potentialLogin.rowCount === 0) {
            return res.status(400).json({ loggedIn: false, errorMessage: "Wrong username or password" });
        }

        const user = potentialLogin.rows[0];
        const isSamePass = await bcrypt.compare(password, user.passhash);
        if (!isSamePass) {
            return res.status(400).json({ loggedIn: false, errorMessage: "Wrong username or password" });
        }

        const token = await jwtSign({
            username: user.username,
            id: user.id,
            userId: user.userid
        }, process.env.JWT_SECRET, { expiresIn: '1day' });

        res.json({ loggedIn: true, token });

    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ loggedIn: false, errorMessage: "Try again later!" });
    }
};

module.exports.handleRegister = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (existingUser.rowCount > 0) {
            return res.status(400).json({ loggedIn: false, errorMessage: "Username taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, passhash, userId) VALUES ($1, $2, $3) RETURNING username, id, userId",
            [username, hashedPassword, uuidv4()]
        );

        const token = await jwtSign({
            username: newUser.rows[0].username,
            id: newUser.rows[0].id,
            userId: newUser.rows[0].userid
        }, process.env.JWT_SECRET, { expiresIn: '1day' });

        res.json({ loggedIn: true, token });

    } catch (err) {
        console.error("Registration failed:", err);
        res.status(500).json({ loggedIn: false, errorMessage: "Try again later!" });
    }
};

module.exports.logout = async (req, res) => {
    try {
        const token = getJWT(req);
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = await jwtVerify(token, process.env.JWT_SECRET);
        await redisClient.hset(`user:${decoded.username}`, "connected", false);
        const friendList = await redisClient.lrange(`friends:${decoded.username}`, 0, -1);
        const friendRooms = friendList.map(friend => friend.split('.')[1]);
        req.io.to(friendRooms).emit("connected", false, decoded.username);

        res.json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout failed:", err);
        res.status(500).json({ success: false, message: "Logout failed" });
    }
};
