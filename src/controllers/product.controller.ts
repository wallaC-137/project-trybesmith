import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import product from '../services/product.service';

const create = async (req: Request, res: Response) => {
  const { name, price, orderId } = req.body;

  // if (!name) { return res.status(400).json({ message: '"name" is required' }); }
  // if (!price) { return res.status(400).json({ message: '"price" is required' }); }

  const { status, data } = await product.create({ name, price, orderId });

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  return res.status(201).json(data);
};

const findAll = async (_req: Request, res: Response) => {
  const { status, data } = await product.findAll();

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  return res.status(200).json(data);
};

export default {
  create,
  findAll,
};