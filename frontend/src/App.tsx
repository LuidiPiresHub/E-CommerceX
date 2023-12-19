import { Routes, Route } from 'react-router-dom';
import EcommerceProvider from './context/EcommerceProvider';
import Products from './pages/products/Products';
import ProductDetail from './pages/productDetails/ProductDetails';
import NotFound from './pages/notFound/NotFound';
import Cart from './pages/cart/Cart';

export default function App() {
  return (
    <EcommerceProvider>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </EcommerceProvider>
  );
}
