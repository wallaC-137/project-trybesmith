import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import product from '../services/product.service';

const create = async (req: Request, res: Response) => {
  const { name, price, orderId } = req.body;
  const { /* status, */ data } = await product.create({ name, price, orderId });

  // if (status !== 'SUCCESSFUL') {
  //   return res.status(mapStatusHTTP(status)).json(data);
  // }

  return res.status(201).json(data);
};

export default {
  create,
};