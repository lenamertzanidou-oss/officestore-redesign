import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/catalog';

const StoreContext = createContext(null);
const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('os-cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('os-wishlist', []));
  const [toast, setToast] = useState('');
  const [language, setLanguage] = useState('HY');

  useEffect(() => localStorage.setItem('os-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('os-wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (product, quantity = 1) => {
    if (!product || product.stock === 0) return;
    const qty = Math.max(product.minQty || 1, Number(quantity) || 1);
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      return [...current, { id: product.id, quantity: qty }];
    });
    setToast(`«${product.name}» ավելացվեց զամբյուղ`);
  };

  const updateQty = (id, quantity) => {
    const p = products.find((item) => item.id === id);
    const min = p?.minQty || 1;
    if (quantity < min) return;
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const toggleWishlist = (id) => {
    setWishlist((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  };

  const cartLines = useMemo(() => cart.map((line) => ({ ...line, product: products.find((p) => p.id === line.id) })).filter((x) => x.product), [cart]);
  const subtotal = useMemo(() => cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0), [cartLines]);
  const hasFreeDelivery = cartLines.some((line) => line.product.slug === 'aparan-water-18-9');
  const deliveryFee = cartLines.length === 0 || hasFreeDelivery ? 0 : 600;
  const total = subtotal + deliveryFee;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart, cartLines, wishlist, language, setLanguage, toast,
    addToCart, updateQty, removeFromCart, clearCart, toggleWishlist,
    subtotal, deliveryFee, hasFreeDelivery, total, itemCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
