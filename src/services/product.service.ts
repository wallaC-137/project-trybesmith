import { ServiceResponse, Product } from '../types/Product';
import ProductSchema from '../schemas/products.schema';
import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel, 
} from '../database/models/product.model';

const create = async (
  product: ProductInputtableTypes,
) :Promise<ServiceResponse<Product>> => {
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