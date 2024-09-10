export interface ICart {
  id?: string;
  user_id?: string;
  cart_product_id: string;
  cart_product_title: string;
  cart_product_price: number;
  cart_product_quantity: number;
  cart_product_thumbnail: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICartBackend {
  message: ICart[];
}
