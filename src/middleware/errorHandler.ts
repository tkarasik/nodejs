import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './validators';

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ValidationError) res.status(400).send(`Validation error: ${err.message}`);
  else next(err);
};
