const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const mongoose = require("mongoose");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
    SESS_LIFETIME = TWO_HOURS,
    SESS_SECRET,
    NODE_ENV
} = process.env;

const IN_PROD = NODE_ENV === 'production';

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = (incomingApp) => {
    // <== app is just a placeholder here
    // but will become a real "app" in the app.js
    // when this file gets imported/required there

    // use session
    incomingApp.use(session({
        name: "appCookie",
        resave: false,
        saveUninitialized: true,
        secret: SESS_SECRET,
        cookie: {
            maxAge: TWO_HOURS,
            sameSite: true,
            secure: IN_PROD
        },
        // store: new MongoStore({
        //     mongooseConnection: mongoose.connection,
        //     // ttl => time to live
        //     ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
        // }),
    }));
};


// const sessionConfig = {
//     name: "next-connect.sid",
//     // secret used for using signed cookies w/ the session
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI,
//         mongooseConnection: mongoose.connection,
//         ttl: 14 * 24 * 60 * 60 // save session for 14 days
//     }),

//     cookie: {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
//     }
// }

// if (!dev) {
//     sessionConfig.cookie.secure = true; // serve secure cookies in production environment
//     server.set("trust proxy", 1); // trust first proxy
// }


/* Apply our session configuration to express-session */
// module.exports = session(sessionConfig);