const session = require('express-session');
const RedisStore = require("connect-redis").default
const redisClient = require('../redis.js');
require('dotenv').config();

const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sessionId",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000
    }
});

const wrap = (expressMiddleware) => {
    return (socket, next) => expressMiddleware(socket.request, {}, next)
}

const corsConfig = {
    origin: "process.env.CLIENT_URL",
    credentials: true,
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
    methods: "GET,POST,PUT,DELETE,PATCH,PORT",
}
module.exports = { sessionMiddleware, wrap, corsConfig };