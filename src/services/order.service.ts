/* eslint-disable max-lines-per-function */
import { Order, OrderToJson } from '../types/Order';
import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';
import { ServiceResponse } from '../types/Product';

const findAll = async (): Promise<ServiceResponse<Order[]>> => {
  let responseService: ServiceResponse<Order[]>;

  const orders = await OrderModel.findAll({ 
    include: [{
      model: ProductModel, as: 'productIds', attributes: ['id'],
    }],
  });
  
  if (orders.length === 0) {
    responseService = { status: 'NOT_FOUND', data: { message: 'Orders not found' } };
    return responseService;
  }
  
  const objOrder: OrderToJson[] = orders.map((order) => order.toJSON());

  const result = objOrder.map((order) => ({
    ...order,
    productIds: order.productIds.map((product) => product.id),
  }));
  
  responseService = {
    status: 'SUCCESSFUL', data: result,
  };

  return responseService;
};

export default {
  findAll,
};