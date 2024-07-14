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
    unit_amount: Number((product.price * 100).toFixed(0)),
  },
  quantity: product.quantity,
}));
