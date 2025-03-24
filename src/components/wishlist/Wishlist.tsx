
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import WishlistItem from './WishlistItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { getWishlistItems, items } = useWishlist();
  const navigate = useNavigate();
  
  const wishlistItems = getWishlistItems();
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          You haven't added any products to your wishlist yet. Discover products you love and add them for later.
        </p>
        <Button onClick={() => navigate('/products')}>
          Discover Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 animate-fade-in">Wishlist ({items.length} items)</h1>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 animate-slide-up">
        {wishlistItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <WishlistItem 
              id={item.id}
              name={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              image={item.image}
            />
            {index < wishlistItems.length - 1 && <Separator />}
          </React.Fragment>
        ))}
        
        <div className="mt-6">
          <Button variant="outline" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
