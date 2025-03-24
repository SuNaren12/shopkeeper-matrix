
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';

const CartPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        <Cart />
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
