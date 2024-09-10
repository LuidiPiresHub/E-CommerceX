import { IStripeProduct } from '../interfaces/stripe.interface';

export const createLineItems = (products: IStripeProduct[]) => products.map((product) => ({
  price_data: {
    currency: 'brl',
    product_data: {
      name: product.cart_product_title,
      images: [product.cart_product_thumbnail],
      metadata: {
        productId: product.cart_product_id,
      },
    },
    unit_amount: Number((product.cart_product_price * 100).toFixed(0)),
  },
  quantity: product.cart_product_quantity,
}));
