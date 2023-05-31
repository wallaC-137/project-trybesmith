import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import order from '../services/order.service';

const findAll = async (_req: Request, res: Response) => {
  const { status, data } = await order.findAll();

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  return res.status(200).json(data);
};

export default {
  findAll,
};