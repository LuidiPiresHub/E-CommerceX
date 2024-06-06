import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <ToastContainer />
      <App />
    </AuthProvider>
  </BrowserRouter>
);
