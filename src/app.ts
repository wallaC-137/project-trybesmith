import express from 'express';

import productRouter from './routers/product.router';
import orderRouter from './routers/order.router';
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/login', userRouter);
export default app;
