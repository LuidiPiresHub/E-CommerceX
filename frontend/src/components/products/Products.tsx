// import { useEffect } from 'react';
import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formartPrice } from '../../utils/functions';
import EcommerceContext from '../../context/EcommerceContext';
import { useContext } from 'react';

export default function Product() {
  // const { products, error, fetchData } = useContext(EcommerceContext);
  const { setCartAmount } = useContext(EcommerceContext);


  // useEffect(() => {
  //   fetchData();
  // }, []);

  const error = null;

  // const products: IProduct[] = [
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },
  //   {
  //     id: Math.floor(Math.random() * 1000),
  //     productName: 'PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB',
  //     price: 12345,
  //     productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  //   },


  // ];

  const products2: IProduct[] = [
    {
      id: 1,
      productName: 'Produto 1',
      price: 123,
      productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      id: 2,
      productName: 'Produto 2',
      price: 123,
      productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      id: 3,
      productName: 'Produto 3',
      price: 123,
      productImage: 'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
  ];

  interface IProduct {
    id: number;
    productName: string;
    price: number;
    productImage: string;
  }


  const addToCart = (product: IProduct): void => {
    const cartItems = JSON.parse(localStorage.getItem('cart')!) || [];
    setCartAmount(cartItems.length);
    const existingProductIndex = cartItems.findIndex((item: IProduct) => item.id === product.id);
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCartAmount((JSON.parse(localStorage.getItem('cart')!) || []).length);
  };


  return (
    <main>
      <section className={styles.card}>
        {!error ? (products2.map((product) => (
          <div key={product.id} className={styles.cardWrapper}>
            <Link to={`/product/${product.id}`} className={styles.cardItem}>
              <img src={product.productImage} alt={product.productName} className={styles.cardImage} />
              <div className={styles.cardInfo}>
                {/* <h2 className={styles.cardTitle}>{product.productName}</h2> */}
                <h2 className={styles.cardTitle}>PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB</h2>
                <span className={styles.cardPrice}>{`${formartPrice(product.price)} à vista`}</span>
                <p className={styles.cardInstallments}>{`Em até 12x de ${formartPrice(product.price / 12)} sem juros`}</p>
              </div>
            </Link>
            <button type='button' onClick={() => addToCart(product)} className={styles.cardBuy}>Adicionar ao carrinho {<FaCartArrowDown />}</button>
          </div>
        ))) : (
          <h1>{error}</h1>
        )}
      </section>
    </main>
  );
}
