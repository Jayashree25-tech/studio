
"use client";

import type { ReactNode } from "react";
import { createContext, useState, useEffect, useMemo } from "react";
import type { Book, CartItem } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, purchaseType: 'rent' | 'buy') => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const addToCart = (book: Book, purchaseType: 'rent' | 'buy') => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === book.id && item.purchaseType === purchaseType
      );
      if (existingItem) {
        return prevItems;
      }
      
      const price = purchaseType === 'rent' ? book.rentPrice : book.buyPrice;
      const cartItem: CartItem = { ...book, purchaseType, price, id: `${book.id}-${purchaseType}` };
      
      return [...prevItems, cartItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.length;
  const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, cartCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
