const winston = require("winston");

const { combine, colorize, printf, timestamp } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  exitOnError: false,
  defaultMeta: {},
  format: combine(
    colorize(),
    timestamp(),
    colorize(),
    printf(
      (info) =>
        `${info.level}: ${info.message} ${info.stack || ""} ${info.error || ""}`
    )
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;
