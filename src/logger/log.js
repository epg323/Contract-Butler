const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine( winston.format.colorize(),winston.format.simple()),
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      name:'console.info',
      format: winston.format.combine( winston.format.colorize(),winston.format.simple()),
      colorize: true
    }),
  ],
});

module.exports = logger;
