
import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { products } from '@/data/mockData';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  quantity: number;
  image: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  discountPrice,
  quantity,
  image,
}) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const increment = () => {
    const product = products.find(p => p.id === id);
    if (product && quantity < product.stock) {
      updateQuantity(id, quantity + 1);
    }
  };
  
  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };
  
  const displayPrice = discountPrice || price;
  const itemTotal = displayPrice * quantity;
  
  // Extract slug for product link
  const product = products.find(p => p.id === id);
  const slug = product?.slug || '';
  
  return (
    <div className="flex items-start py-4 animate-fade-in">
      {/* Product Image */}
      <Link to={`/products/${slug}`} className="shrink-0">
        <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary/20">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <Link to={`/products/${slug}`} className="font-medium hover:text-primary/90 transition-colors line-clamp-1">
            {name}
          </Link>
          <Button variant="ghost" size="icon" onClick={() => removeFromCart(id)} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-end mt-2">
          {/* Price */}
          <div>
            <div className="text-sm font-medium">
              ${displayPrice.toFixed(2)}
              {discountPrice && (
                <span className="text-xs text-muted-foreground line-through ml-2">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Subtotal: ${itemTotal.toFixed(2)}
            </div>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button variant="ghost" size="icon" onClick={decrement} className="h-8 w-8 rounded-none">
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={increment} className="h-8 w-8 rounded-none">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
