// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IProduct } from "@/commons/types";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface ICartContextType {
  cartItems: ICartItem[];
  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<ICartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("shoppingCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Falha ao carregar carrinho do localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Falha ao salvar carrinho no localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product: IProduct, quantityToAdd: number = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantityToAdd;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity: quantityToAdd }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.product.id !== productId); // Remove se a quantidade for 0 ou menos
      }
      return prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
