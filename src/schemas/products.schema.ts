import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required().min(3),
  price: Joi.string().required().min(3),
  orderId: Joi.number(),
});

export default productSchema;