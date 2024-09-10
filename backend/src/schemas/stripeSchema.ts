import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  cart_product_id: Yup.string().required(),
  cart_product_title: Yup.string().required(),
  cart_product_price: Yup.number().positive().required(),
  cart_product_thumbnail: Yup.string().required(),
  cart_product_quantity: Yup.number().positive().required(),
});
