import winston from 'winston';

export default (name: string): winston.Logger => {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    defaultMeta: {
      name,
    },
  });
};
