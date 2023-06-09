import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ProductValidation from '../middlewares/products.validations';

const productRouter = Router();

productRouter.get('/', ProductController.findAll);
productRouter.post('/', ProductValidation, ProductController.create);

export default productRouter;