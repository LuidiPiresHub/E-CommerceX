import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/products/Products';
import ProductDetail from './pages/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Favorites from './pages/favorites/Favorites';
import CheckoutCancel from './pages/checkoutCancel/CheckoutCancel';
import CheckoutSuccess from './pages/checkoutSuccess/CheckoutSuccess';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  useEffect(() => {
    const hideWelcomeMessage = JSON.parse(localStorage.getItem('hideWelcomeMessage')!);
    if (hideWelcomeMessage) return;
    Swal.fire({
      icon: 'info',
      title: 'Bem-vindo à E-CommerceX!',
      html: 'Gostaria de informar que a E-CommerceX é uma demonstração fictícia. <br><br>Nenhum dos produtos exibidos são reais, e os detalhes de pagamento também são simulados.',
      input: 'checkbox',
      inputAutoFocus: false,
      inputPlaceholder: 'Não mostrar novamente',
      inputValidator: (value) => {
        const boolValue = Boolean(value);
        if (boolValue) {
          localStorage.setItem('hideWelcomeMessage', JSON.stringify(boolValue));
        }
      },
      confirmButtonText: 'Entendi',
      confirmButtonColor: 'rgb(48, 133, 214)',
    });
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path='/checkout/success' element={<CheckoutSuccess />} />
        <Route path='/checkout/cancel' element={<CheckoutCancel />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
