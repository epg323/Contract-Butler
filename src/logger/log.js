const winston = require('winston');

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    exitOnError: false,
    transports:[
        new winston.transports.Console({
            format: winston.format.json()
        })
    ]
});

module.exports = logger;