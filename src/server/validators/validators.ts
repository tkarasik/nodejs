import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const idValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = joi.string().length(36).validate(req.params.id);
  if (error) {
    throw new ValidationError(`Id ${req.params.id} is not valid - uuid length should be 36`);
  } else next();
};

export const nameValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = joi.string().min(3).validate(req.body.name);
  if (error) {
    throw new ValidationError(`Name ${req.body.name} doesn't meet the 3 characters minimal length criteria`);
  } else next();
};

export class ValidationError extends Error {}
