// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type{ IProduct } from '@/commons/types'; // Importa IProduct do seu types.ts

// Define a interface para um item no carrinho
export interface ICartItem {
    product: IProduct;
    quantity: number;
}

// Define a interface para o contexto do carrinho
interface ICartContextType {
    cartItems: ICartItem[];
    addToCart: (product: IProduct, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

// Cria o contexto com um valor padrão (será substituído pelo Provider)
const CartContext = createContext<ICartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Tenta carregar o carrinho do localStorage ao iniciar
    const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem('shoppingCart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Falha ao carregar carrinho do localStorage:", error);
            return [];
        }
    });

    // Salva o carrinho no localStorage sempre que 'cartItems' muda
    useEffect(() => {
        try {
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Falha ao salvar carrinho no localStorage:", error);
        }
    }, [cartItems]);

    // Função para adicionar um produto ao carrinho
    const addToCart = (product: IProduct, quantityToAdd: number = 1) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);

            if (existingItemIndex > -1) {
                // Se o produto já existe, atualiza a quantidade
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantityToAdd;
                return updatedItems;
            } else {
                // Se o produto não existe, adiciona como um novo item
                return [...prevItems, { product, quantity: quantityToAdd }];
            }
        });
    };

    // Função para remover um produto do carrinho
    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    // Função para atualizar a quantidade de um produto no carrinho
    const updateQuantity = (productId: number, newQuantity: number) => {
        setCartItems(prevItems => {
            if (newQuantity <= 0) {
                return prevItems.filter(item => item.product.id !== productId); // Remove se a quantidade for 0 ou menos
            }
            return prevItems.map(item =>
                item.product.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    // Função para limpar o carrinho
    const clearCart = () => {
        setCartItems([]);
    };

    // Função para obter o número total de itens (unidades) no carrinho
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Função para obter o preço total do carrinho
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
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
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Hook customizado para usar o carrinho
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};