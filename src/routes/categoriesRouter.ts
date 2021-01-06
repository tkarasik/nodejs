import express from 'express';
import { addCategory, deleteCategory, editCategory, getCategories, getCategory, getProductsByCategory } from '../controllers/categoriesController';

const router = express.Router();

router.get('/', async (req, res) => getCategories(req, res));
router.get('/:id', async (req, res) => getCategory(req, res));
router.post('/', async (req, res) => addCategory(req, res));
router.put('/:id', async (req, res) => editCategory(req, res));
router.delete('/:id', async (req, res) => deleteCategory(req, res));
router.get('/:id/products', async (req, res) => getProductsByCategory(req, res));

export default router;
