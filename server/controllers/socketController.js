const redisClient = require('../redis.js');

module.exports.authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad request!");
        return next(new Error("Unauthorized"));
    }
    socket.user = { ...socket.request.session.user };
    redisClient.hset(`user:${socket.user.username}`, "userId", socket.user.userId);
    next();
}