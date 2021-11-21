import { React } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CartPage from './screens/CartPage/CartPage';
import CheckoutPage from './screens/CheckoutPage/CheckoutPage';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import NotImplemented from './screens/NotImplemented/NotImplemented';
import ProductPage from './screens/ProductPage/ProductPage';
import ProductListPage from './screens/ProductListPage/ProductListPage';
import AccountPage from './screens/ProfilePage/ProfilePage';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<NotImplemented />} />
        <Route path="/checkout" element={<NotImplemented />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
