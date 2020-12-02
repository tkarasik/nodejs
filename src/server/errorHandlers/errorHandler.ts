import express from 'express';
import { ValidationError } from '../validators/validators';

export default (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (err instanceof ValidationError) res.status(400).send(`Validation error: ${err.message}`);
  else next();
};
