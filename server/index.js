const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js');
const { sessionMiddleware, wrap, corsConfig } = require('./controllers/serverController.js');
const { authorizeUser } = require('./controllers/socketController.js');

const io = new Server(server, {
    cors: corsConfig
})
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json('Hello World');
})
io.use(wrap(sessionMiddleware));
io.use(authorizeUser)
io.on('connect', (socket) => {
    // console.log(socket.request.session.user.username);
    console.log(socket.id);
    console.log("UserId:", socket.user.userId);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})