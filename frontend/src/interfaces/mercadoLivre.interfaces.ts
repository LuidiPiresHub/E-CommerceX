import { IProduct } from './products.interface';

export interface IMercadoLivreResponse {
  results: IProduct[];
  paging: {
    total: number;
  };
}
