require('dotenv').config();

const corsConfig = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    "Access-Control-Allow-Origin": process.env.CLIENT_URL,
    "Access-Control-Allow-Credentials": true,
    methods: "GET,POST,PUT,DELETE,PATCH,PORT",
}
module.exports = { corsConfig };