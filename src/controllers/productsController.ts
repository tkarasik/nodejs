import { Request, Response } from 'express';
import { ErrorCategory } from '../utils/actionStatus';
import { DataService } from '../services/dataService';
import createLogger from '../middleware/logger';

const dataService = DataService.getInstance();
const logger = createLogger('products');

export async function getProducts(req: Request, res: Response): Promise<void> {
  const products = await dataService.getProducts();
  res.status(200).send(products);
}

export async function getProduct(req: Request, res: Response): Promise<void> {
    logger.info(`Getting product with id ${req.params.id}`);
    const product = await dataService.getProduct(req.params.id);
    if (product) res.status(200).send(product);
    else res.status(404).send(`Product with id ${req.params.id} was not found`);
}

export async function addProduct(req: Request, res: Response): Promise<void> {
  const status = await dataService.addProduct(req.body.categoryId, req.body.name, req.body.itemsInStock);
  if (status.success) res.status(201).send("Product added successfully");
  else res.status(409).send(status.error);
}

export async function editProduct(req: Request, res: Response): Promise<void> {
  const status = await dataService.editProduct(req.params.id, req.body.categoryId, req.body.name, req.body.itemsInStock);
  if (status.success) res.status(200).send("Product edited successfully");
  else
    switch (status.errorCategory) {
      case ErrorCategory.NotFound:
        res.status(404).send(status.error);
        break;
      case ErrorCategory.Validation:
        res.status(409).send(status.error);
        break;
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const status = await dataService.deleteProduct(req.params.id);
  if (status.success) res.status(204).send("Product deleted successfully");
  else res.status(404).send(status.error);
}
