import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import userService from '../services/user.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { status, data } = await userService.login({ username, password });

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  res.status(200).json(data);
};

export default {
  login,
};