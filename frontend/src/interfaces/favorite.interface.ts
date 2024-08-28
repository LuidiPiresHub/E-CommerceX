export interface IProductFavorite {
    id: string;
    users_id: string | null;
    favorited_product_id: string;
    favorited_product_name: string;
    favorited_product_price: number;
    favorited_product_thumbnail: string;
    created_at: Date;
    updated_at: Date;
}

export interface IFavoriteBackend {
  message: {
    products: IProductFavorite[];
    pageCount: number;
  } | string;
}
