
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, categories, subcategories } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find the product
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  // Get category and subcategory
  const category = categories.find(c => c.id === product.categoryId);
  const subcategory = subcategories.find(s => s.id === product.subcategoryId);
  
  const isWishlisted = isInWishlist(product.id);
  const discount = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Sorry, only ${product.stock} items available`);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };
  
  const handleToggleWishlist = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-0" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4 animate-fade-in">
          {/* Main Image */}
          <div className="overflow-hidden rounded-lg bg-secondary/20 aspect-square">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          <div className="flex space-x-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                className={`rounded-md overflow-hidden aspect-square w-20 border-2 ${
                  idx === activeImageIndex ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="animate-slide-up">
          {/* Category & Product Name */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{category?.name}</span>
              {subcategory && (
                <>
                  <span>/</span>
                  <span>{subcategory.name}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-medium">{product.name}</h1>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.isNew && (
              <Badge variant="default" className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.discountPrice && (
              <Badge variant="default" className="bg-destructive text-destructive-foreground">
                {discount}% OFF
              </Badge>
            )}
            {product.stock <= 10 && (
              <Badge variant="outline" className="border-amber-500 text-amber-500">
                Low Stock: {product.stock} left
              </Badge>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, idx) => (
                <Star 
                  key={idx} 
                  className={`w-4 h-4 ${
                    idx < Math.floor(product.rating) 
                      ? 'fill-primary text-primary' 
                      : idx < product.rating 
                        ? 'fill-primary/50 text-primary/50' 
                        : 'text-muted'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">${product.discountPrice.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {/* Quantity Selector and Add to Cart */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-8">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="rounded-none border-r"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center w-16">
                <span className="text-center">{quantity}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className="rounded-none border-l"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button 
              variant={isWishlisted ? "default" : "outline"} 
              size="icon"
              onClick={handleToggleWishlist}
              className={isWishlisted ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
          
          <Separator className="my-8" />
          
          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $100</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-sm text-muted-foreground">Full coverage for peace of mind</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-muted-foreground">Easy and hassle-free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
