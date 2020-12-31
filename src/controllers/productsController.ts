import { Request, Response } from 'express';
import { ErrorCategory } from '../utils/actionStatus';
import { DataService } from '../services/dataService';
import createLogger from '../middleware/logger';

const dataService = new DataService();
const logger = createLogger('products');

export function getProducts(req: Request, res: Response): void {
  res.status(200).send(dataService.getProducts());
}

export async function getProduct(req: Request, res: Response): Promise<void> {
  try {
    logger.info(`Getting product with id ${req.params.id}`);
    const product = await dataService.getProductAsync(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send(err);
  }
}

export function addProduct(req: Request, res: Response): void {
  const status = dataService.addProduct(req.body.categoryId, req.body.name, req.body.itemsInStock);
  if (status.success) {
    res.status(201).send('Product added successfully');
  } else {
    res.status(409).send(status.error);
  }
}

export function editProduct(req: Request, res: Response): void {
  const status = dataService.editProduct(req.params.id, req.body.categoryId, req.body.name, req.body.itemsInStock);
  if (status.success) {
    res.status(200).send('Product edited successfully');
  } else {
    switch (status.errorCategory) {
      case ErrorCategory.NotFound:
        res.status(404).send(status.error);
        break;
      case ErrorCategory.Validation:
        res.status(409).send(status.error);
        break;
    }
  }
}

export function deleteProduct(req: Request, res: Response): void {
  const status = dataService.deleteProduct(req.params.id);
  if (status.success) {
    res.status(204).send('Product deleted successfully');
  } else {
    res.status(404).send(status.error);
  }
}
