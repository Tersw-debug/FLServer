const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders:['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}

module.exports = corsOptions;