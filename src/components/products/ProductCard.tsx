import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1️⃣ Navigate එක සඳහා අවශ්‍යයි
import type { Product } from '../../types/types';
import Button from '../ui/Button';
import { useCartStore } from '../../store/cartStore';
import { cartService } from '../../services/cartService';
import { useAuthStore } from '../../store/authStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate(); // 2️⃣ Navigate function එක initialize කිරීම
  const BACKEND_URL = 'http://localhost:5000';
  const fallbackImage = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop";
  const imageUrl = product.image 
    ? (product.image.startsWith('http') ? product.image : `${BACKEND_URL}/${product.image}`)
    : fallbackImage;

  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`); // 3️⃣ Details page එකට යවන function එක
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Card එක click වීම වැළැක්වීමට (Event bubbling prevent)
    try {
      addItem(product, 1);
      if (isAuthenticated) {
        await cartService.addToCart(product._id, 1);
      }
    } catch (err) {
      console.error('❌ Failed to add to cart:', err);
    }
  };

  return (
    <div 
      onClick={handleViewDetails} // 4️⃣ මුළු Card එකම click කළ හැකි කිරීම
      className="group bg-white/90 backdrop-blur rounded-[2rem] border border-white/70 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      
      {/* Product Image Section */}
      <div className="relative h-64 overflow-hidden bg-stone-100/80">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button 
            onClick={handleViewDetails} // Eye icon එකෙනුත් details වලට යාම
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white text-stone-700 transition-colors"
          >
            <Eye size={20} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-orange-600 shadow-sm uppercase">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-stone-400 block mb-1 font-medium tracking-wider uppercase">Price</span>
            <span className="text-2xl font-black text-orange-600">
              Rs.{product.price.toFixed(2)}
            </span>
          </div>
          
          <Button 
            variant="primary" 
            size="sm" 
            icon={ShoppingCart} 
            className="rounded-2xl px-4"
            onClick={handleAddToCart} // Cart එකට ඇඩ් කිරීමේ බොත්තම
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;