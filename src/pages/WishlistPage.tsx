
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Wishlist from '@/components/wishlist/Wishlist';

const WishlistPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        <Wishlist />
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
