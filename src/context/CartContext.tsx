
import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/mockData';
import { toast } from '@/components/ui/sonner';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItems: () => {
    id: number;
    name: string;
    price: number;
    discountPrice: number | null;
    quantity: number;
    image: string;
  }[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const addToCart = (productId: number, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (product.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      
      if (existingItem) {
        // Check stock before updating quantity
        if (product.stock < existingItem.quantity + quantity) {
          toast.error("Not enough stock available");
          return prevItems;
        }
        
        const updatedItems = prevItems.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Updated quantity in cart`);
        return updatedItems;
      } else {
        toast.success(`Added to cart`);
        return [...prevItems, { productId, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    toast.success("Removed from cart");
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    if (product.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };
  
  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return total;
      
      const price = product.discountPrice || product.price;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const getCartItems = () => {
    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return {
          id: item.productId,
          name: "Product Not Found",
          price: 0,
          discountPrice: null,
          quantity: item.quantity,
          image: "/placeholder.svg"
        };
      }
      
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: item.quantity,
        image: product.images[0]
      };
    });
  };
  
  return (
    <CartContext.Provider value={{ 
      items, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal, 
      getCartItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
