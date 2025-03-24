import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Package, Users, ShoppingBag, Tag, BarChart3, CreditCard, 
  List, Grid2X2, PlusCircle, Search, ChevronDown, LogOut 
} from 'lucide-react';
import { products, categories, users, orders } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

// Admin sidebar menu item
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center w-full p-3 rounded-md text-left transition-colors ${
      active
        ? 'bg-primary text-primary-foreground' 
        : 'hover:bg-secondary'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </button>
);

// Admin dashboard main content
const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  
  // Check if user is admin, if not redirect to home
  if (!isAdmin) {
    navigate('/');
    toast.error("You don't have permission to access this page");
    return null;
  }
  
  // Sidebar menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={18} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
    { id: 'users', label: 'Users', icon: <Users size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard size={18} /> },
  ];
  
  // Dashboard statistics cards
  const statsCards = [
    { 
      title: 'Total Products', 
      value: products.length,
      icon: <Package className="h-8 w-8 text-blue-500" />,
      change: '+5%',
      changeType: 'positive'
    },
    { 
      title: 'Total Users', 
      value: users.length,
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Total Orders', 
      value: orders.length,
      icon: <ShoppingBag className="h-8 w-8 text-purple-500" />,
      change: '+8%',
      changeType: 'positive'
    },
    { 
      title: 'Total Revenue', 
      value: '$' + orders.reduce((acc, order) => acc + order.total, 0).toFixed(2),
      icon: <CreditCard className="h-8 w-8 text-amber-500" />,
      change: '+15%',
      changeType: 'positive'
    },
  ];
  
  // Render dashboard content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-medium mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <h3 className="text-2xl font-semibold mt-1">{card.value}</h3>
                      <p className={`text-xs mt-2 ${
                        card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {card.change} from last month
                      </p>
                    </div>
                    <div className="bg-secondary/40 p-3 rounded-lg">
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium text-sm">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium text-sm">Customer</th>
                      <th className="text-left py-3 px-2 font-medium text-sm">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-sm">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const customer = users.find(u => u.id === order.userId);
                      return (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-2 text-sm">#{order.id}</td>
                          <td className="py-3 px-2 text-sm">{customer?.name || 'Unknown'}</td>
                          <td className="py-3 px-2 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-2 text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'shipped' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm font-medium">${order.total.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Popular Products */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Popular Products</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.isFeatured).slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center p-3 border rounded-lg">
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-secondary/20">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {product.stock} in stock • {product.reviewCount} reviews
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${(product.discountPrice || product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'products':
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Products</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10 w-full md:w-60" />
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
                <div className="border rounded-md flex">
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-l-none"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-square bg-secondary/20">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-1">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <span className="font-medium">
                            ${(product.discountPrice || product.price).toFixed(2)}
                          </span>
                          {product.discountPrice && (
                            <span className="text-xs text-muted-foreground line-through ml-2">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                          Stock: {product.stock}
                        </span>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-3 px-4 font-medium text-sm">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const category = categories.find(c => c.id === product.categoryId);
                      return (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded overflow-hidden bg-secondary/20 flex-shrink-0">
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="ml-3 font-medium line-clamp-1">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{category?.name || 'Uncategorized'}</td>
                          <td className="py-3 px-4 text-sm font-medium">
                            ${(product.discountPrice || product.price).toFixed(2)}
                            {product.discountPrice && (
                              <span className="text-xs text-muted-foreground line-through ml-2">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm">{product.stock}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              product.stock > 10 
                                ? 'bg-green-100 text-green-800' 
                                : product.stock > 0 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock > 10 
                                ? 'In Stock' 
                                : product.stock > 0 
                                ? 'Low Stock' 
                                : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-medium mb-2">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
              <p className="text-muted-foreground mb-6">This section is under development.</p>
              <Button variant="outline" onClick={() => setActiveSection('dashboard')}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-secondary/40">
      {/* Sidebar */}
      <div className="w-64 bg-background shadow-md border-r h-full flex-shrink-0">
        <div className="p-4 border-b">
          <h1 className="font-bold text-xl">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome, {user?.name}</p>
        </div>
        
        <div className="p-4 space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
          
          <Separator className="my-3" />
          
          <SidebarItem
            icon={<LogOut size={18} />}
            label="Logout"
            active={false}
            onClick={logout}
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
