"use client"
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Cart {
    cart: CartItem[],
    addToCart: (product: CartItem) => void,
    removeFromCart: (id: string) => void,
    clearCart: () => void,
}

const CartContext = createContext<Cart | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem("cart");

            return storedCart ? JSON.parse(storedCart) : [];
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                return prev.map((cartItem) => cartItem.id === item.id ?
                    { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem)
            }

            return [...prev, item];
        })
    }

    const removeFromCart = (id: string) => {
        setCart((prev) => (prev.filter((item) => item.id !== id)))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};