import express from 'express';
import { addProduct, deleteProduct, editProduct, getProduct, getProducts } from '../controllers/productsController';

const router = express.Router();

router.get('/', (req, res) => getProducts(req, res));
router.get('/:id', async (req, res) => getProduct(req, res));
router.post('/', (req, res) => addProduct(req, res));
router.put('/:id', (req, res) => editProduct(req, res));
router.delete('/:id', (req, res) => deleteProduct(req, res));

export default router;
