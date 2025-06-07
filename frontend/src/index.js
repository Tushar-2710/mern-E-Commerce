import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/auth';
import { AdminAuthProvider } from "./context/adminAuth";
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AdminAuthProvider>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </BrowserRouter>


);

reportWebVitals();
