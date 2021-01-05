import express from 'express';
import { addProduct, deleteProduct, editProduct, getProduct, getProducts } from '../controllers/productsController';

const router = express.Router();

router.get('/', async (req, res) => getProducts(req, res));
router.get('/:id', async (req, res) => getProduct(req, res));
router.post('/', async (req, res) => addProduct(req, res));
router.put('/:id', async (req, res) => editProduct(req, res));
router.delete('/:id', async (req, res) => deleteProduct(req, res));

export default router;
