import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/mockData';
import { toast } from '@/hooks/use-toast';

interface WishlistContextType {
  items: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistItems: () => {
    id: number;
    name: string;
    price: number;
    discountPrice: number | null;
    image: string;
  }[];
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<number[]>([]);
  
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);
  
  const addToWishlist = (productId: number) => {
    if (items.includes(productId)) {
      toast.info("Already in wishlist");
      return;
    }
    
    setItems(prevItems => [...prevItems, productId]);
    toast.success("Added to wishlist");
  };
  
  const removeFromWishlist = (productId: number) => {
    setItems(prevItems => prevItems.filter(id => id !== productId));
    toast.success("Removed from wishlist");
  };
  
  const isInWishlist = (productId: number) => {
    return items.includes(productId);
  };
  
  const getWishlistItems = () => {
    return items.map(id => {
      const product = products.find(p => p.id === id);
      if (!product) {
        return {
          id,
          name: "Product Not Found",
          price: 0,
          discountPrice: null,
          image: "/placeholder.svg"
        };
      }
      
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.images[0]
      };
    });
  };
  
  return (
    <WishlistContext.Provider value={{ 
      items, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      getWishlistItems 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
