import { IProduct } from '../interfaces/stripe.interface';

export const createLineItems = (data: IProduct[]) => data.map((product) => ({
  price_data: {
    currency: 'brl',
    product_data: {
      name: product.title,
      images: [product.thumbnail],
      metadata: {
        productId: product.id,
      },
    },
    unit_amount: parseInt(product.price as string) * 100,
  },
  quantity: product.quantity,
}));
