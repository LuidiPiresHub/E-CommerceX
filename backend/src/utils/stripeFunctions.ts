import { IStripeProduct } from '../interfaces/stripe.interface';

export const createLineItems = (products: IStripeProduct[]) => products.map((product) => ({
  price_data: {
    currency: 'brl',
    product_data: {
      name: product.title,
      images: [product.thumbnail],
      metadata: {
        productId: product.id,
      },
    },
    unit_amount: product.price * 100,
  },
  quantity: product.quantity,
}));
