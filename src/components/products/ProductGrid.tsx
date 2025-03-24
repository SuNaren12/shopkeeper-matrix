
import React from 'react';
import ProductCard from './ProductCard';
import { products, categories, subcategories } from '@/data/mockData';

interface ProductGridProps {
  categoryId?: number;
  subcategoryId?: number;
  featured?: boolean;
  newArrivals?: boolean;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  categoryId,
  subcategoryId,
  featured = false,
  newArrivals = false,
  limit,
}) => {
  // Filter products based on props
  let filteredProducts = [...products];
  
  if (categoryId) {
    filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
  }
  
  if (subcategoryId) {
    filteredProducts = filteredProducts.filter(product => product.subcategoryId === subcategoryId);
  }
  
  if (featured) {
    filteredProducts = filteredProducts.filter(product => product.isFeatured);
  }
  
  if (newArrivals) {
    filteredProducts = filteredProducts.filter(product => product.isNew);
  }
  
  // Limit the number of products if specified
  if (limit && limit > 0) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  // Map product IDs to their category and subcategory names
  const productsWithCategories = filteredProducts.map(product => {
    const category = categories.find(c => c.id === product.categoryId);
    const subcategory = subcategories.find(s => s.id === product.subcategoryId);
    
    return {
      ...product,
      categoryName: category?.name || '',
      subcategoryName: subcategory?.name || '',
    };
  });

  if (productsWithCategories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {productsWithCategories.map((product, index) => (
        <div 
          key={product.id} 
          className="animation-delay-100"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <ProductCard
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            discountPrice={product.discountPrice}
            image={product.images[0]}
            isNew={product.isNew}
            isFeatured={product.isFeatured}
            categories={`${product.categoryName}${product.subcategoryName ? ` / ${product.subcategoryName}` : ''}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
