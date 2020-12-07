import express from 'express';
import { ErrorCategory } from '../../data/actionStatus';
import { DataProvider } from '../../data/dataProvider';
import createLogger from '../logger/logger';

const router = express.Router();
const dataProvider = new DataProvider();
const logger = createLogger('productsRouter');

router.get('/', (req, res) => {
  res.status(200).send(dataProvider.getProducts());
});

router.get('/:id', async (req, res) => {
  try {
    logger.info(`Getting product with id ${req.params.id}`);
    const product = await dataProvider.getProductAsync(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post('/', (req, res) => {
  const status = dataProvider.addProduct(req.body.categoryId, req.body.name, req.body.itemsInStock);
  if (status.success) {
    res.status(201).send('Product added successfully');
  } else {
    res.status(409).send(status.error);
  }
});

router.put('/:id', (req, res) => {
  const status = dataProvider.editProduct(req.params.id, req.body.categoryId, req.body.name, req.body.itemsInStock);
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
});

router.delete('/:id', (req, res) => {
  const status = dataProvider.deleteProduct(req.params.id);
  if (status.success) {
    res.status(204).send('Product deleted successfully');
  } else {
    res.status(404).send(status.error);
  }
});

export default router;
