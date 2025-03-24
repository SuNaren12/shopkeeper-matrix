
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-medium mb-6">Your Shopping Cart</h1>
          <Cart />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
