// import { Model } from 'sequelize';
import { ServiceResponse, Product } from 'src/types/Product';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

// const validate = ({ name, price, orderId }: ProductInputtableTypes): string | null => {
//   if (!name || !price || !orderId) {
//     return 'Missing required fields!';
//   }

//   return null;
// };

const create = async (
  product: ProductInputtableTypes,
) :Promise<ServiceResponse<Product>> => {
  // try {
  // let responseService: ServiceResponse<Product>;

  // const error = validate(product);
  // if (error) {
  //   responseService = { status: 'INVALID_DATA', data: { message: error } };
  //   return responseService;
  // }

  const newProduct = await ProductModel.create(product);
  // responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };
  const responseService: ServiceResponse<Product> = {
    status: 'SUCCESSFUL', data: newProduct.dataValues,
  };
  return responseService;
  // } catch (error) {
  // return { status: 'ERROR', data: { message: 'server error' } };
  // }
};

export default {
  create,
}; 