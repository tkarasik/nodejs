import { Request, Response } from "express";
import { DataService } from "../services/dataService";
import createLogger from "../middleware/logger";

const dataService = DataService.getInstance();
const logger = createLogger("categories");

export async function getCategories(
  req: Request,
  res: Response
): Promise<void> {
  const categories = await dataService.getCategories();
  res.status(200).send(categories);
}

export async function getCategory(req: Request, res: Response): Promise<void> {
  logger.info(`Getting category with id ${req.params.id}`);
  const category = await dataService.getCategory(req.params.id);
  if (category) res.status(200).send(category);
  else res.status(404).send(`Category with id ${req.params.id} was not found`);
}

export async function addCategory(req: Request, res: Response): Promise<void> {
  const status = await dataService.addCategory(req.body.name);
  res.status(201).send("Category added successfully");
}

export async function editCategory(req: Request, res: Response): Promise<void> {
  const status = await dataService.editCategory(req.params.id, req.body.name);
  if (status.success) res.status(200).send("Category edited successfully");
  else res.status(404).send(status.error);
}

export async function deleteCategory(
  req: Request,
  res: Response
): Promise<void> {
  const status = await dataService.deleteCategory(req.params.id);
  if (status.success) res.status(204).send("Category deleted successfully");
  else res.status(404).send(status.error);
}

export async function getProductsByCategory(
  req: Request,
  res: Response
): Promise<void> {
  const category = await dataService.getCategory(req.params.id);
  if (category)
    res
      .status(200)
      .send(await dataService.getProductsByCategory(req.params.id));
  else res.status(404).send(`Category with id ${req.params.id} was not found`);
}
