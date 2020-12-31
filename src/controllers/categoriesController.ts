import { Request, Response } from 'express';
import { DataService } from '../services/dataService';
import createLogger from '../middleware/logger';

const dataService = new DataService();
const logger = createLogger('categories');

export function getCategories(req: Request, res: Response): void {
  res.status(200).send(dataService.getCategories());
}

export async function getCategory(req: Request, res: Response): Promise<void> {
  try {
    logger.info(`Getting category with id ${req.params.id}`);
    const category = await dataService.getCategoryAsync(req.params.id);
    res.status(200).send(category);
  } catch (err) {
    res.status(404).send(err);
  }
}

export function addCategory(req: Request, res: Response): void {
  dataService.addCategory(req.body.name);
  res.status(201).send('Category added successfully');
}

export function editCategory(req: Request, res: Response): void {
  const status = dataService.editCategory(req.params.id, req.body.name);
  if (status.success) {
    res.status(200).send('Category edited successfully');
  } else {
    res.status(404).send(status.error);
  }
}

export function deleteCategory(req: Request, res: Response): void {
  const status = dataService.deleteCategory(req.params.id);
  if (status.success) {
    res.status(204).send('Category deleted successfully');
  } else {
    res.status(404).send(status.error);
  }
}

export function getProductsByCategory(req: Request, res: Response): void {
  const category = dataService.getCategory(req.params.id);
  if (category) {
    res.status(200).send(dataService.getProductsByCategory(req.params.id));
  } else {
    res.status(404).send(`Category id ${req.params.id} was not found`);
  }
}
