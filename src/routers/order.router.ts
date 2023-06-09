import { Router } from 'express';
import OderController from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/', OderController.findAll);
// orderRouter.post('/', ProductController.create);

export default orderRouter;