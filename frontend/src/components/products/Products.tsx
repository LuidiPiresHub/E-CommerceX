import styles from './Products.module.css';

export default function Product() {
  const fakeData = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      image: 'https://picsum.photos/200/300',
    },
  ];
  return (
    <main>
      <section className={styles.card}>
        {fakeData.map((product) => (
          <div key={product.id} className={styles.cardItem}>
            <img src={product.image} alt={product.name} className={styles.cardImage} />
            <h2>{product.name}</h2>
            <span>{`R$ ${product.price.toFixed(2)}`}</span>
            <p>{`Em até 12x de ${(product.price / 12).toFixed(2).replace('.', ',')}`}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
