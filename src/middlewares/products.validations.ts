import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const productValidation = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  if (!name) {
    return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: '"name" is required' });
  }
  if (!price) { 
    return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: '"price" is required' }); 
  }

  next();
};

export default productValidation;