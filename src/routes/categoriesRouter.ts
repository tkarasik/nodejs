import express from 'express';
import { addCategory, deleteCategory, editCategory, getCategories, getCategory } from '../controllers/categoriesController';

const router = express.Router();

router.get('/', (req, res) => getCategories(req, res));
router.get('/:id', async (req, res) => getCategory(req, res));
router.post('/', (req, res) => addCategory(req, res));
router.put('/:id', (req, res) => editCategory(req, res));
router.delete('/:id', (req, res) => deleteCategory(req, res));
router.get('/:id/products', (req, res) => getCategory(req, res));

export default router;
