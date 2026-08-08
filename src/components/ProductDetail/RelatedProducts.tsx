import React from 'react';
import type { Product } from '../../types/product';
import ProductCard from '../BoxProductCategory/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="font-bold text-base text-gray-900">Sản phẩm liên quan</h3>
        <div className="flex items-center space-x-1">
          <button className="w-7 h-7 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-600 flex items-center justify-center text-gray-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-600 flex items-center justify-center text-gray-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.images[0]}
            price={product.price}
            marketPrice={product.marketPrice}
            discountPercent={product.discountPercent}
            badge={product.badge}
            inStock={product.inStock}
            link={`/product/${product.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
