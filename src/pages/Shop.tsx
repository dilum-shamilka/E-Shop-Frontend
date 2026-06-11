import React, { useEffect, useState } from 'react';
import ProductCard from '../components/products/ProductCard';
import type { Product } from '../types/types';
import { productService } from '../services/productService';
import { Loader2, Search, Filter, ShoppingBag } from 'lucide-react';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // අපි Dashboard එකේ පාවිච්චි කරපු categories ලැයිස්තුවම මෙතනටත් ගනිමු
  const categories = [
    'Electronics', 'Clothing', 'Home & Kitchen', 
    'Books', 'Health & Beauty', 'Toys', 'Other'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // 1. Category අනුව Filter කිරීම (Case-insensitive)
    if (category !== 'all') {
      filtered = filtered.filter((p) => 
        p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // 2. Search Text එක අනුව Filter කිරීම
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  }, [search, category, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-orange-600 mb-2" />
        <p className="text-stone-500 font-medium">Opening the Shop...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-2 rounded-2xl text-white shadow-lg shadow-orange-200/70">
              <ShoppingBag size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Our Shop</h1>
          </div>
          <span className="text-sm font-bold text-orange-700 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
            {filteredProducts.length} Products Found
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-3 top-3 h-5 w-5 text-stone-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                type="text"
                placeholder="What are you looking for today?..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all shadow-sm bg-white/75 focus:bg-white"
              />
            </div>
          </div>
          
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full md:w-64 pl-4 pr-10 py-2.5 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none bg-white cursor-pointer shadow-sm font-semibold text-stone-700 hover:border-orange-300 transition-all"
            >
              <option value="all">🛍️ All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white/80 backdrop-blur rounded-[2rem] border-2 border-dashed border-stone-200 shadow-sm">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-stone-100">
             <Search className="h-10 w-10 text-stone-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">We couldn't find any results</h3>
          <p className="text-stone-500 max-w-xs mx-auto">Try checking your spelling or using more general terms to find what you need.</p>
          <button 
            onClick={() => { setSearch(''); setCategory('all'); }}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-200/70"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;