const express = require('express');
const { Server } = require('socket.io');
const app = express();
const httpserver = require('http').createServer(app);
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routes/authRoutes.js');
const { sessionMiddleware, wrap, corsConfig } = require('./controllers/serverController.js');
const { authorizeUser, initializeUser, addFriend, onDisconnect, dm } = require('./controllers/socketController.js');


const io = new Server(httpserver, {
    cors: corsConfig
})
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use('/auth', authRouter);
app.set('trust proxy', 1);

app.get('/', (req, res) => {
    res.json('Hello World');
})
io.use(wrap(sessionMiddleware));
io.use(authorizeUser)
io.on('connect', (socket) => {
    // console.log(socket.request.session.user.username);
    initializeUser(socket)
    socket.on("add_friend", (friendName, cb) => {
        addFriend(socket, friendName, cb)
    })
    socket.on("dm", (message) => dm(socket, message))
    socket.on('disconnect', () => onDisconnect(socket))
});
httpserver.listen(3000, () => {
    console.log('Server is running on port 3000');
})