import UserService from './user.service';
import { Order, OrderT, OrderToJson } from '../types/Order';
import ProductModel from '../database/models/product.model';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import { ServiceResponse, ServiceResponseError } from '../types/Product';

const formatOrder = (order: OrderSequelizeModel[]): ServiceResponseError | null => {
  if (order.length === 0) {
    const responseService: ServiceResponseError = {
      status: 'NOT_FOUND', data: { message: 'Orders not found' }, 
    };
    return responseService;
  }
  return null;
};

const findAll = async (): Promise<ServiceResponse<Order[]>> => {
  const orders = await OrderModel.findAll({ 
    include: [{
      model: ProductModel, as: 'productIds', attributes: ['id'],
    }],
  });
  
  const resultFail = formatOrder(orders);
  
  if (resultFail) return resultFail;

  const objOrder: OrderToJson[] = orders.map((order) => order.toJSON());

  const result = objOrder.map((order) => ({
    ...order,
    productIds: order.productIds.map((product) => product.id),
  }));

  const responseService: ServiceResponse<Order[]> = {
    status: 'SUCCESSFUL', data: result,
  };

  return responseService;
};

const create = async (order: OrderT): Promise<ServiceResponse<OrderT>> => {
  const { userId, productIds } = order;

  const findUser = await UserService.findByUserId(userId);
  if (findUser) return findUser;

  const newOrder = await OrderModel.create({ userId });
  Promise.all([
    productIds.forEach(async (productId) => {
      await ProductModel.update(
        { orderId: newOrder.dataValues.id },
        { where: { id: productId } },
      );
    }),
  ]); 

  const responseService: ServiceResponse<OrderT> = {
    status: 'SUCCESSFUL', data: { userId, productIds },
  };

  return responseService;
};

export default {
  findAll,
  create,
};