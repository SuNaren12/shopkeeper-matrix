
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetail from '@/components/products/ProductDetail';
import ProductGrid from '@/components/products/ProductGrid';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/mockData';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the product to get its category for similar products
  const product = products.find(p => p.slug === slug);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ProductDetail />
        
        {product && (
          <>
            <Separator className="container mx-auto my-16" />
            
            <div className="container mx-auto px-4 pb-16">
              <h2 className="text-2xl font-medium mb-8 animate-fade-in">You May Also Like</h2>
              <ProductGrid 
                categoryId={product.categoryId} 
                limit={4} 
              />
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
