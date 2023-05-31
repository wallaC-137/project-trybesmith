import { Order, OrderToJson } from '../types/Order';
import ProductModel from '../database/models/product.model';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import { ServiceResponse, ServiceResponseError } from '../types/Product';

const formatOrder = (order: OrderSequelizeModel[]): ServiceResponseError | null => {
  if (order.length === 0) {
    const responseService = { status: 'NOT_FOUND', data: { message: 'Orders not found' } };
    return responseService as ServiceResponseError;
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

export default {
  findAll,
};