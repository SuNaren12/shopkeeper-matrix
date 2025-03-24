
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  categories?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  price,
  discountPrice,
  image,
  isNew = false,
  isFeatured = false,
  categories = '',
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isWishlisted ? removeFromWishlist(id) : addToWishlist(id);
  };
  
  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;
  
  return (
    <div className="group animate-fade-in">
      <Link to={`/products/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-background aspect-square mb-4">
          {/* Product Image */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Quick Action Buttons */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex flex-col gap-2 p-2 absolute bottom-4 right-4">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-md bg-white hover:bg-white"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-md bg-white hover:bg-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground">New</Badge>
            )}
            {discountPrice && (
              <Badge variant="default" className="bg-destructive text-destructive-foreground">
                {discount}% OFF
              </Badge>
            )}
            {isFeatured && !isNew && !discountPrice && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">Featured</Badge>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          {categories && (
            <p className="text-xs text-muted-foreground mb-1">{categories}</p>
          )}
          <h3 className="font-medium text-sm sm:text-base transition-colors group-hover:text-primary/90 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center mt-1">
            {discountPrice ? (
              <>
                <span className="font-medium text-sm sm:text-base">${discountPrice.toFixed(2)}</span>
                <span className="text-muted-foreground line-through text-xs sm:text-sm ml-2">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-medium text-sm sm:text-base">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
