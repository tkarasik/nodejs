import express from 'express';
import { DataProvider } from '../../data/dataProvider';

const router = express.Router();
const dataProvider = new DataProvider();

router.get('/', (req, res) => {
  res.status(200).send(dataProvider.getCategories());
});

router.get('/:id', async (req, res) => {
  try {
    const category = await dataProvider.getCategoryAsync(req.params.id);
    res.status(200).send(category);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post('/', (req, res) => {
  dataProvider.addCategory(req.body.name);
  res.status(201).send('Category added successfully');
});

router.put('/:id', (req, res) => {
  const status = dataProvider.editCategory(req.params.id, req.body.name);
  if (status.success) {
    res.status(200).send('Category edited successfully');
  } else {
    res.status(404).send(status.error);
  }
});

router.delete('/:id', (req, res) => {
  const status = dataProvider.deleteCategory(req.params.id);
  if (status.success) {
    res.status(204).send('Category deleted successfully');
  } else {
    res.status(404).send(status.error);
  }
});

router.get('/:id/products', (req, res) => {
  const category = dataProvider.getCategory(req.params.id);
  if (category) {
    res.status(200).send(dataProvider.getProductsByCategory(req.params.id));
  } else {
    res.status(404).send(`Category id ${req.params.id} was not found`);
  }
});

export default router;
