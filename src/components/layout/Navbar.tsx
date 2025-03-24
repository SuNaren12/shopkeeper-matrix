
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';
import { categories } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl md:text-2xl">
            MINIMAL
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium flex items-center">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-white/90 backdrop-blur-md">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/category/${category.slug}`} className="w-full">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/products" className="text-sm font-medium hover:text-primary/80 transition-colors">
              All Products
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 md:space-x-5">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md">
                  <div className="p-2 font-medium">
                    {user?.name}
                  </div>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4 px-4 py-6 bg-white/95 backdrop-blur-md shadow-md">
            <Link to="/" className="text-sm font-medium p-2 hover:bg-secondary rounded-md">
              Home
            </Link>
            
            <div className="text-sm font-medium p-2">Categories</div>
            <div className="pl-4 space-y-2">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="block text-sm p-2 hover:bg-secondary rounded-md"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <Link to="/products" className="text-sm font-medium p-2 hover:bg-secondary rounded-md">
              All Products
            </Link>
            
            <div className="border-t border-gray-200 my-2"></div>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-sm font-medium p-2 hover:bg-secondary rounded-md">
                  Profile
                </Link>
                <Link to="/orders" className="text-sm font-medium p-2 hover:bg-secondary rounded-md">
                  Orders
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-sm font-medium p-2 hover:bg-secondary rounded-md">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-sm font-medium p-2 text-left hover:bg-destructive hover:text-destructive-foreground rounded-md flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="text-sm font-medium p-2 hover:bg-secondary rounded-md flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Login / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
