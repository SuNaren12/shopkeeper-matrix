
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockData';

const Hero = () => (
  <div className="relative overflow-hidden pt-16 pb-20 md:pb-32 bg-gradient-to-br from-secondary to-background">
    <div className="container mx-auto px-4 pt-16 flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 animate-slide-up">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
          Premium Quality Products
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
          Discover Elegance in <br className="hidden lg:block" />
          <span className="font-semibold">Minimal Design</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0">
          Experience the perfect blend of functionality and aesthetics with our curated collection of products designed for modern living.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
          <Button size="lg" className="px-8">
            Shop Now
          </Button>
          <Button size="lg" variant="outline">
            Explore Collections
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 animate-slide-in-right">
        <div className="bg-white p-10 rounded-2xl shadow-2xl shadow-primary/10 rotate-1 transform">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img src="/placeholder.svg" alt="Featured product" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img src="/placeholder.svg" alt="Featured product" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img src="/placeholder.svg" alt="Featured product" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img src="/placeholder.svg" alt="Featured product" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedCategories = () => (
  <div className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl font-medium mb-4">Shop by Category</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our carefully curated collections designed with simplicity and elegance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={category.id} 
            to={`/category/${category.slug}`}
            className="group rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 bg-white border animation-delay-100"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <img src="/placeholder.svg" alt={category.name} className="w-8 h-8" />
              </div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Explore Products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const FeaturedProducts = () => (
  <div className="py-16 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 animate-fade-in">
        <div>
          <h2 className="text-3xl font-medium">Featured Products</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Discover our most popular items, handpicked for exceptional quality and design.
          </p>
        </div>
        <Link to="/products">
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <ProductGrid featured limit={4} />
    </div>
  </div>
);

const NewArrivals = () => (
  <div className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 animate-fade-in">
        <div>
          <h2 className="text-3xl font-medium">New Arrivals</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Be the first to shop our latest collections fresh from the warehouse.
          </p>
        </div>
        <Link to="/products">
          <Button variant="outline" className="mt-4 md:mt-0">
            View All New Arrivals
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <ProductGrid newArrivals limit={4} />
    </div>
  </div>
);

const PromotionBanner = () => (
  <div className="py-16 md:py-24 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 text-center animate-fade-in">
      <span className="inline-block px-3 py-1 bg-primary-foreground text-primary text-sm font-medium rounded-full mb-4">
        Limited Time Offer
      </span>
      <h2 className="text-3xl md:text-4xl font-medium mb-4 max-w-3xl mx-auto leading-tight">
        Get 20% Off Your First Purchase When You Sign Up
      </h2>
      <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
        Subscribe to our newsletter and receive exclusive offers, early access to new products, and styling tips.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <Button variant="secondary" size="lg" className="flex-grow">
          Sign Up Now
        </Button>
        <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary flex-grow">
          Learn More
        </Button>
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in">
        <div className="text-center p-6 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <img src="/placeholder.svg" alt="Free shipping" className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
          <p className="text-muted-foreground">
            Enjoy free standard shipping on all orders over $100. Fast and reliable delivery to your doorstep.
          </p>
        </div>
        
        <div className="text-center p-6 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <img src="/placeholder.svg" alt="Secure payments" className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
          <p className="text-muted-foreground">
            Shop with confidence using our secure payment methods. Your information is always protected.
          </p>
        </div>
        
        <div className="text-center p-6 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <img src="/placeholder.svg" alt="Easy returns" className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">Easy Returns</h3>
          <p className="text-muted-foreground">
            Not satisfied? Return within 30 days for a full refund. No questions asked.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <PromotionBanner />
        <NewArrivals />
        <Features />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
