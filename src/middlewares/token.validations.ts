import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwtUtil from '../utils/jwt.util';

const userIdValidations = (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json({ message: '"userId" is required' });
  }
  
  if (typeof userId !== 'number') {
    return res.status(mapStatusHTTP('UNPROCESSABLE_ENTITY'))
      .json({ message: '"userId" must be a number' });
  }
};

const productIdsValidations = (req: Request, res: Response) => {
  const { productIds } = req.body;
  if (!productIds) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json({ message: '"productIds" is required' });
  }
  
  if (!Array.isArray(productIds)) {
    return res.status(mapStatusHTTP('UNPROCESSABLE_ENTITY'))
      .json({ message: '"productIds" must be an array' });
  }

  if (!productIds[0]) {
    return res.status(mapStatusHTTP('UNPROCESSABLE_ENTITY'))
      .json({ message: '"productIds" must include only numbers' });
  }
};

const tokenValidations = (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token not found' });
  }
  
  const token = jwtUtil.verify(authorization);
  if (!token) {
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Invalid token' });
  }
};

const middlewaresValidations = (req: Request, res: Response, next: NextFunction) => {
  const middleware01 = tokenValidations(req, res);
  if (middleware01) return middleware01;
  const middleware02 = userIdValidations(req, res);
  if (middleware02) return middleware02;
  const middleware03 = productIdsValidations(req, res);
  if (middleware03) return middleware03;

  next();
};

export default middlewaresValidations;
