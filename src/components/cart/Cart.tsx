
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { getCartItems, getCartTotal, clearCart, cartCount } = useCart();
  const navigate = useNavigate();
  
  const cartItems = getCartItems();
  const total = getCartTotal();
  const shippingFee = total > 100 ? 0 : 10;
  const tax = total * 0.08; // 8% tax for example
  const grandTotal = total + shippingFee + tax;
  
  if (cartCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our products and start shopping!
        </p>
        <Button onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8 animate-fade-in">Shopping Cart ({cartCount} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <CartItem 
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  quantity={item.quantity}
                  image={item.image}
                />
                {index < cartItems.length - 1 && <Separator />}
              </React.Fragment>
            ))}
            
            <div className="flex justify-between mt-6">
              <Button variant="ghost" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="outline" onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1 animate-slide-up">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                {shippingFee === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>${shippingFee.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              
              {shippingFee > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Add ${(100 - total).toFixed(2)} more to get free shipping
                </p>
              )}
              
              <Button className="w-full mt-6 h-12" size="lg">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
