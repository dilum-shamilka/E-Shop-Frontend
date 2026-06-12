import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
  import { useCartStore } from '../store/cartStore';
  import CartItem from '../components/cart/CartItem';
  import CartSummary from '../components/cart/CartSummary';

  const Cart: React.FC = () => {
    const { items, clearCart } = useCartStore();

    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-stone-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
          <p className="text-stone-600 mb-6">Add some products to your cart!</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl hover:from-orange-600 hover:to-amber-600 transition shadow-lg shadow-orange-200/70"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Start Shopping
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white/88 backdrop-blur rounded-[2rem] shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden border border-white/70">
              <div className="p-4 border-b border-stone-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                  </h2>
                  <button
                    onClick={clearCart}
                    className="flex items-center text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <CartSummary />
            
            <div className="mt-6 space-y-4">
              <Link
                to="/products"
                className="block w-full border border-orange-300 text-orange-700 text-center py-3 rounded-2xl hover:bg-orange-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Cart;