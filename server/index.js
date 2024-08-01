const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter.js');
const session = require('express-session');
require('dotenv').config();

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
})

app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
    methods: "GET,POST,PUT,DELETE,PATCH,PORT",
}));
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000
    }
}));
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json('Hello World');
})

io.on('connect', (socket) => { });

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})