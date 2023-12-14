import { Routes, Route } from 'react-router-dom';
import EcommerceProvider from './context/EcommerceProvider';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Cart from './pages/cart/Cart';

export default function App() {
  return (
    <EcommerceProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </EcommerceProvider>
  );
}
