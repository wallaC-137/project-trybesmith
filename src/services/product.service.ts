// import { Model } from 'sequelize';
import { ServiceResponse, Product } from '../types/Product';
import ProductModel, {
  ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import ProductSchema from '../schemas/products.schema';
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
  
  const { error } = ProductSchema.validate(product);
  if (error) {
    return { 
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: error.message }, 
    };
  }

  const newProduct = await ProductModel.create(product);
  const responseService: ServiceResponse<Product> = {
    status: 'SUCCESSFUL', data: newProduct.dataValues,
  };
  return responseService;
  // } catch (error) {
  // return { status: 'ERROR', data: { message: 'server error' } };
  // }
};

const findAll = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  let responseService: ServiceResponse<ProductSequelizeModel[]>;
  
  const products = await ProductModel.findAll();

  if (products.length === 0) {
    responseService = { status: 'NOT_FOUND', data: { message: 'Products not found' } };
    return responseService;
  }

  responseService = {
    status: 'SUCCESSFUL', data: products,
  };
  return responseService;
};

export default {
  create,
  findAll,
}; 