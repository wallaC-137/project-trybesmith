import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse, ServiceResponseError } from '../types/Product';
import { Login, Token } from '../types/User';
import jwtUtil from '../utils/jwt.util';

const login = async (date: Login): Promise<ServiceResponse<Token>> => {
  if (!date.username || !date.password) {
    return { status: 'INVALID_DATA',
      data: { 
        message: '"username" and "password" are required' },
    };
  }

  const resultUser = await UserModel.findOne({ where: { username: date.username } });

  if (!resultUser || !bcrypt.compareSync(date.password, resultUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  
  const { username, id } = resultUser.dataValues;

  const token = jwtUtil.sign({ id, username });

  return { status: 'SUCCESSFUL', data: { token } };
};

const findByUserId = async (userId: number): Promise<ServiceResponseError | undefined> => {
  const findUser = await UserModel.findByPk(userId);
  if (!findUser) {
    const responseService: ServiceResponseError = {
      status: 'NOT_FOUND',
      data: { message: '"userId" not found' }, 
    };
    
    return responseService;
  }
};

export default {
  login,
  findByUserId,
};