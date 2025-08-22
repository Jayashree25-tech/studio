"use client";

import type { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import type { Book } from "@/lib/types";

interface CartContextType {
  items: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Book[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (book: Book) => {
    setItems((prevItems) => {
      // Prevent adding duplicates
      if (prevItems.find((item) => item.id === book.id)) {
        return prevItems;
      }
      return [...prevItems, book];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.length;
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, cartCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
