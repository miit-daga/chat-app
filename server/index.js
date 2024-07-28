const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter.js');

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
    methods: "GET,POST,PUT,DELETE,PATCH",
}));
app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json('Hello World');
})

io.on('connect', (socket) => { });

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})