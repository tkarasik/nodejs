import express from 'express';
import cors from 'cors';
import apiRouter from './routers/apiRouter';
import errorHandler from './errorHandlers/errorHandler';

export class ProductsServer {
  private readonly app = express();

  Init(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/api', apiRouter);

    this.app.use(errorHandler);

    this.app.listen(process.env.PORT || 3000, () => {
      console.log('Listening');
    });
  }
}
