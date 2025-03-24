
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/mockData';

interface WishlistItemProps {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  image: string;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  name,
  price,
  discountPrice,
  image,
}) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(id);
    removeFromWishlist(id);
  };
  
  // Extract slug for product link
  const product = products.find(p => p.id === id);
  const slug = product?.slug || '';
  
  return (
    <div className="flex items-center py-4 animate-fade-in">
      {/* Product Image */}
      <Link to={`/products/${slug}`} className="shrink-0">
        <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary/20">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="ml-4 flex-grow">
        <Link to={`/products/${slug}`} className="font-medium hover:text-primary/90 transition-colors line-clamp-1">
          {name}
        </Link>
        
        <div className="text-sm mt-1">
          {discountPrice ? (
            <div className="flex items-center">
              <span className="font-medium">${discountPrice.toFixed(2)}</span>
              <span className="text-muted-foreground line-through ml-2">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-medium">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center ml-4 space-x-2">
        <Button onClick={handleAddToCart} size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add
        </Button>
        
        <Button variant="ghost" size="icon" onClick={() => removeFromWishlist(id)} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
