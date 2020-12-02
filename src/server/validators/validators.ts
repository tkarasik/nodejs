import express from 'express';

export const idValidator = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const id = req.params.id;
  if (id.length !== 36) {
    throw new ValidationError(`Id ${id} is not valid - uuid length should be 36`);
  } else next();
};

export const nameValidator = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const name = req.body.name;
  if (name.length < 3) {
    throw new ValidationError(`Name ${name} doesn't meet the 3 characters minimal length criteria`);
  } else next();
};

export class ValidationError extends Error {}
