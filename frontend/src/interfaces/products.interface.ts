export interface IProduct {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

export interface IProductDetail extends IProduct {
  pictures: {
    id: string;
    url: string;
  }[];
}

export interface IProductCart extends IProduct {
  quantity: number;
}
