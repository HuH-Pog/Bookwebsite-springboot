import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    setItems([]);
    api.get("/cart").then((response) => {
      applyServerItems(response.data);
    }).catch(() => {
      setItems([]);
    });
  }, [user]);

  const applyServerItems = (serverItems) => {
    setItems(serverItems.map((item) => ({ ...item, id: item.bookId })));
  };

  const addToCart = (book) => {
    if (user) {
      setItems((currentItems) => {
        const existing = currentItems.find((item) => item.id === book.id);
        if (existing) {
          return currentItems.map((item) => item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, book.stock) }
            : item);
        }
        return [...currentItems, { ...book, quantity: 1 }];
      });
      api.post("/cart/items", { bookId: book.id, quantity: 1 })
        .then((response) => applyServerItems(response.data))
        .catch(() => api.get("/cart").then((response) => applyServerItems(response.data)));
      return;
    }

    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === book.id);
      if (existing) {
        return currentItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, book.stock) }
            : item
        );
      }
      return [...currentItems, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (bookId, quantity) => {
    if (user) {
      if (!Number.isInteger(quantity) || quantity < 1) return;
      setItems((currentItems) => currentItems.map((item) =>
        item.id === bookId ? { ...item, quantity: Math.min(quantity, item.stock) } : item
      ));
      api.patch(`/cart/items/${bookId}`, { bookId, quantity })
        .then((response) => applyServerItems(response.data))
        .catch(() => api.get("/cart").then((response) => applyServerItems(response.data)));
      return;
    }

    setItems((currentItems) =>
      currentItems
        .map((item) => (item.id === bookId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (bookId) => {
    if (user) {
      const previousItems = items;
      setItems((currentItems) => currentItems.filter((item) => item.id !== bookId));
      api.delete(`/cart/items/${bookId}`)
        .then((response) => applyServerItems(response.data))
        .catch(() => setItems(previousItems));
      return;
    }

    setItems((currentItems) => currentItems.filter((item) => item.id !== bookId));
  };

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );
  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
