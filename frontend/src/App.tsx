import { Routes, Route } from 'react-router-dom';
import EcommerceProvider from './context/EcommerceProvider';
import Products from './pages/products/Products';
import ProductDetail from './pages/productDetails/ProductDetails';
import NotFound from './pages/notFound/NotFound';
import Cart from './pages/cart/Cart';
import CheckoutCancel from './pages/checkoutCancel/CheckoutCancel';
import CheckoutSuccess from './pages/checkoutSuccess/CheckoutSuccess';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

export default function App() {
  return (
    <EcommerceProvider>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout/success' element={<CheckoutSuccess />} />
        <Route path='/checkout/cancel' element={<CheckoutCancel />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </EcommerceProvider>
  );
}
