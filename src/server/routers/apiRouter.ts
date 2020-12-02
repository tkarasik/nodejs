import express from 'express';
import { idValidator, nameValidator } from '../validators/validators';
import productsRouter from './productsRouter';
import categoriesRouter from './categoriesRouter';

const router = express.Router();

router.all('/[A-Z]+/:id/:query*?', idValidator);
router.post('*', nameValidator);
router.put('*', nameValidator);

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

export default router;
