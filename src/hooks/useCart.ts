import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/types';

const CART_STORAGE_KEY = 'lmcycle-cart-v2';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, change: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === productId);
      if (!item) return prev;
      
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        return prev.filter(i => i.id !== productId);
      }
      return prev.map(i =>
        i.id === productId ? { ...i, quantity: newQuantity } : i
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(i => i.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    if (confirm('Vider le panier ?')) {
      setCart([]);
    }
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = (notes?: string): string => {
    let message = 'Bonjour, je souhaite commander :\n\n';
    cart.forEach(item => {
      message += `- ${item.name} (x${item.quantity}): ${item.price * item.quantity} TND\n`;
    });
    message += `\n*Total: ${totalPrice} TND*`;
    if (notes?.trim()) {
      message += `\n\nNotes: ${notes.trim()}`;
    }
    return message;
  };

  return {
    cart,
    isLoaded,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    generateWhatsAppMessage,
  };
};
