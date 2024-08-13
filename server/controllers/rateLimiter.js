const redisClient = require("../redis.js");

module.exports.rateLimiter =
    (timeLimit, noOfAttempts) =>
        async (req, res, next) => {
            const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
            const [response] = await redisClient.multi().incr(ip).expire(ip, timeLimit).exec(); //multi() allows us to run multiple commands in a single transaction. incr() increments the value of the key by 1. expire() sets the key to expire in 60 seconds. exec() executes the transaction.
            console.log(response[1]);
            if (response[1] > noOfAttempts) res.json({ loggedIn: false, message: "Rate limit exceeded. Try again in 60 seconds." });
            else next();
        }