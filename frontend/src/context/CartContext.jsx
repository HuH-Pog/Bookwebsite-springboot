import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'bookstore_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (book) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === book.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.id === bookId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, total, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
