import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import middlewaresValidations from '../middlewares/token.validations';

const orderRouter = Router();

orderRouter.get('/', OrderController.findAll);
orderRouter.post('/', middlewaresValidations, OrderController.create);

export default orderRouter;