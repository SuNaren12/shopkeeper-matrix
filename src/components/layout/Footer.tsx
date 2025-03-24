
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">MINIMAL</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium quality products designed with simplicity and elegance in mind.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube size={18} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border py-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">+1 (234) 567-8900</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">support@minimal.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">123 Design St, Creative City</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} MINIMAL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
