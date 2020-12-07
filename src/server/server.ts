import express from 'express';
import cors from 'cors';
import apiRouter from './routers/apiRouter';
import errorHandler from './errorHandlers/errorHandler';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import winston from 'winston';

export class ProductsServer {
  private readonly app = express();

  Init(): void {
    dotenv.config();

    this.app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
      }),
    );
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
      }),
    );

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/api', apiRouter);

    this.app.use(errorHandler);

    this.app.listen(process.env.PORT, () => console.log('Listening'));
  }
}
