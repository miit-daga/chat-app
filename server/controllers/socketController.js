const redisClient = require('../redis.js');
const { jwtVerify } = require('./jwtAuth.js');
require('dotenv').config();

module.exports.authorizeUser = (socket, next) => {
    const token = socket.handshake.auth.token;
    jwtVerify(token, process.env.JWT_SECRET).then(decoded => {
        socket.user = { ...decoded };
        next();
    }).catch(err => {
        console.log("Bad request!!", err);
        next(new Error("Unauthorized"));
    });
}
module.exports.initializeUser = async socket => {
    socket.join(socket.user.userId);
    redisClient.hset(
        `user:${socket.user.username}`,
        "userId",
        socket.user.userId,
        "connected",
        true);
    const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
    const parsedFriendList = await parseFriendList(friendList);
    const friendRooms = parsedFriendList.map(friend => friend.user);
    if (friendRooms.length > 0)
        socket.to(friendRooms).emit("connected", true, socket.user.username)
    socket.emit("friends", parsedFriendList)
    const msgQuery = await redisClient.lrange(`chat:${socket.user.userId}`, 0, -1);
    const messages = msgQuery.map(msgStr => {
        const parsedStr = msgStr.split(".");
        return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] }
    });
    if (messages && messages.length > 0)
        socket.emit("messages", messages)
}

module.exports.addFriend = async (socket, friendName, cb) => {
    if (friendName === socket.user.username) {
        cb({ done: false, errorMsg: "Cannot add self as friend!" }); return;
    }
    const friend = await redisClient.hgetall(`user:${friendName}`);
    const currentFriendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
    if (Object.keys(friend).length === 0) {
        cb({ done: false, errorMsg: "Username not valid" }); return;
    }
    if (currentFriendList && currentFriendList.indexOf(`${friendName}.${friend.userId}`) !== -1) {
        cb({ done: false, errorMsg: "Friend already added!" }); return;
    }
    await redisClient.lpush(`friends:${socket.user.username}`, [friendName, friend.userId].join("."));
    const friendConnected = await redisClient.hget(`user:${friendName}`, "connected");
    const newFriend = {
        username: friendName,
        user: friend.userId,
        connected: friendConnected === "true"
    };
    cb({ done: true, newFriend });
    return;
}

module.exports.onDisconnect = async (socket) => {
    await redisClient.hset(`user:${socket.user.username}`, "connected", false);
    const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
    const friendRooms = await parseFriendList(friendList).then(friends => friends.map(friend => friend.user));
    socket.to(friendRooms).emit("connected", false, socket.user.username);
}

const parseFriendList = async (friendList) => {
    const newFriendList = [];
    for (let friend of friendList) {
        const parsedFriend = friend.split(".");
        const friendConnected = await redisClient.hget(`user:${parsedFriend[0]}`, "connected");
        newFriendList.push({
            username: parsedFriend[0],
            user: parsedFriend[1],
            connected: friendConnected === "true"
        });
    }
    return newFriendList;
};

module.exports.dm = async (socket, message) => {
    message.from = socket.user.userId;
    //to.from.content
    const messageString = [message.to, message.from, message.content].join(".");
    await redisClient.lpush(`chat:${message.to}`, messageString);
    await redisClient.lpush(`chat:${message.from}`, messageString);
    socket.to(message.to).emit("dm", message);
};
