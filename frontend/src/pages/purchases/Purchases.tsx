import { useEffect, useState } from 'react'
import api from '../../axios/api'
import Header from '../../components/header/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import styles from './Purchases.module.css'
import { formartPrice, getHightestQuality } from '../../utils/functions'
import { useGlobal } from '../../context/GlobalContext'
import { Link } from 'react-router-dom'
import { Purchase } from '../../interfaces/purchases.interface'
import { ThreeCircles } from 'react-loader-spinner';

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<null | string>(null)
  const { checkout } = useGlobal()

  useEffect(() => {
    document.title = 'E-CommerceX - Compras'
    const fetchPurchases = async () => {
      try {
        setLoading(true)
        const { data: { message } } = await api.get<{ message: Purchase[] | string }>('/products/purchases')
        if (typeof message === 'string') throw new Error(message)
        setPurchases(message)
      } catch (error) {
        setError((error as Error).message || 'Ocorreu um erro ao buscar suas compras')
      } finally {
        setLoading(false)
      }
    }
    fetchPurchases();
  }, [])

  const handleCheckout = (purchase: Purchase) => {
    checkout([{
      id: purchase.purchased_product_id,
      price: purchase.purchased_product_price / 100,
      title: purchase.purchased_product_name,
      thumbnail: purchase.purchased_product_thumbnail,
      quantity: 1,
    }])
  }

  if (loading) return (
    <>
      <Header />
      <div className={styles.spinnerWrapper}>
        <ThreeCircles
          height="100"
          width="100"
          color="#0076CE"
          ariaLabel="three-circles-loading"
        />
      </div>
    </>
  )

  if (error) return (
    <>
      <Header />
      <h1 className={styles.errorMessage}>{error}</h1>
    </>
  )

  return (
    <>
      <Header />
      <main className={styles.main}>{purchases.map((purchase) => (
        <div key={purchase.id} className={styles.purchaseContainer}>
          <span className={styles.purchaseDate}>{format(purchase.created_at, "dd 'de' MMMM 'de' yyyy 'as' HH:mm", { locale: ptBR })}</span>
          <div className={styles.wrapper}>
            <img src={getHightestQuality(purchase.purchased_product_thumbnail)} alt={purchase.purchased_product_name} className={styles.purchaseImg} />
            <div className={styles.detailsContainer}>
              <h2 className={styles.approved}>Aprovado</h2>
              <h1 className={styles.purchaseTitle}>{purchase.purchased_product_name}</h1>
              <div className={styles.detailsWrapper}>
                <span>{formartPrice(purchase.purchased_product_price / 100)}</span>
                <span>Quantidade: {purchase.purchased_product_quantity}</span>
              </div>
            </div>
            <nav className={styles.btnContainer}>
              <Link to={`/product/${purchase.purchased_product_id}`} className={styles.button}>Ver produto</Link>
              <button type='button' onClick={() => handleCheckout(purchase)} className={styles.button}>Comprar novamente</button>
            </nav>
          </div>
        </div>
      ))}</main>
    </>
  )
}
