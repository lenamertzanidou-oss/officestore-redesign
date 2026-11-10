import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DeliveryPage from './pages/DeliveryPage';
import BlogPage from './pages/BlogPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import LegalPage from './pages/LegalPage';
import DiscountsPage from './pages/DiscountsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/shop" element={<ShopPage/>}/>
    <Route path="/category/:slug" element={<CategoryPage/>}/>
    <Route path="/product/:slug" element={<ProductPage/>}/>
    <Route path="/services/dispenser-maintenance" element={<ServicePage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/contact" element={<ContactPage/>}/>
    <Route path="/delivery" element={<DeliveryPage/>}/>
    <Route path="/blog" element={<BlogPage/>}/>
    <Route path="/cart" element={<CartPage/>}/>
    <Route path="/checkout" element={<CheckoutPage/>}/>
    <Route path="/account" element={<AccountPage/>}/>
    <Route path="/discounts" element={<DiscountsPage/>}/>
    <Route path="/privacy" element={<LegalPage type="privacy"/>}/>
    <Route path="/terms" element={<LegalPage type="terms"/>}/>
    <Route path="/data-deletion" element={<LegalPage type="deletion"/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes></Layout>;
}
