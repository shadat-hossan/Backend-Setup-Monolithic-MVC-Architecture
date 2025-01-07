const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }), // Add timestamp format
    winston.format.printf(({ timestamp, level, message }) => `[${level}] ${message}`) // Modify printf format
    //winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`) // Modify printf format
    // winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({ filename: 'app.log' }) // Add this line
  ],
});

module.exports = logger;
