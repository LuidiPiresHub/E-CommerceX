interface IPictures {
  id: string;
  url: string;
}

interface IProduct {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity?: number;
  pictures: IPictures[];
}

export default IProduct;
