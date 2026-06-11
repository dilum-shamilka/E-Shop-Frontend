import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import ProductList from '../components/products/ProductList';
import type { Product } from '../types/types';
import { productService } from '../services/productService';
import Spinner from '../components/ui/Spinner';

const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Stylish shopping bags and fashion items on display',
  },
  {
    src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern phone and tech accessories',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    alt: 'Clean fashion and lifestyle products arranged neatly',
  },
];

const CTA_IMAGE_URL = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Note: In a real app, you might have dedicated endpoints for 'featured' or 'new'
      const products = await productService.getAll();

      // Simulate featured products (e.g., first 4)
      setFeaturedProducts(products.slice(0, 4));

      // Simulate new arrivals (e.g., last 8, reversed to show newest first)
      setNewArrivals(products.slice(-8).reverse());
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
    },
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Quality Guarantee',
      description: 'Premium quality products',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-12">

      {/* --- HERO SECTION WITH MULTIPLE PHOTOS --- */}
      <section className="relative overflow-hidden rounded-[2.5rem] shadow-[0_24px_80px_rgba(15,23,42,0.18)] bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.22),transparent_32%)]" />
        <div className="relative grid items-center gap-10 px-6 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-14 lg:px-16 lg:py-16">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-200">
              Fresh drops daily
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Discover your next
              <br className="hidden md:block" /> favorite thing.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-200 md:text-xl">
              Explore a curated collection of fashion, tech, and lifestyle products with a cleaner, more visual shopping experience.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/25"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
              >
                Become a User
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl md:col-span-7">
              <img
                src={HERO_IMAGES[0].src}
                alt={HERO_IMAGES[0].alt}
                className="h-[320px] w-full object-cover md:h-[520px]"
              />
            </div>
            <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-xl">
                <img
                  src={HERO_IMAGES[1].src}
                  alt={HERO_IMAGES[1].alt}
                  className="h-40 w-full object-cover md:h-48"
                />
              </div>
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-xl">
                <img
                  src={HERO_IMAGES[2].src}
                  alt={HERO_IMAGES[2].alt}
                  className="h-40 w-full object-cover md:h-48"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4 md:px-8 py-12 bg-white/85 backdrop-blur rounded-[2rem] shadow-[0_16px_50px_rgba(15,23,42,0.08)] border border-white/70">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-orange-50 text-orange-600 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-600 leading-relaxed px-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Featured Products --- */}
      <section className="px-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 sm:mb-12 gap-4">
         <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Featured Products</h2>
          <p className="text-stone-600">Handpicked selections just for you.</p>
         </div>
          <Link
            to="/products"
            className="flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors group"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ProductList
          products={featuredProducts}
          columns={4}
          emptyMessage="No featured products available"
        />
      </section>

      {/* --- New Arrivals --- */}
      <section className="px-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 sm:mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">New Arrivals</h2>
            <p className="text-stone-600">The latest trends added to our store.</p>
          </div>
          <Link
            to="/products"
            className="flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors group"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ProductList
          products={newArrivals}
          columns={4}
          emptyMessage="No new arrivals"
        />
      </section>

      {/* --- CTA SECTION WITH IMAGE --- */}
      {/*
        Changes:
        1. Used bg-cover, bg-center, relative.
        2. Added background image via inline style.
        3. Added a strong blue-tinted overlay (bg-blue-900/80) so it fits the brand.
        4. Changed text colors to white/blue-100 for contrast against the dark overlay.
        5. Increased padding for a more substantial look.
      */}
      <section
        className="relative bg-cover bg-center bg-no-repeat rounded-[2.5rem] overflow-hidden py-24 px-6 text-center text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
        style={{ backgroundImage: `url('${CTA_IMAGE_URL}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-900/78 to-orange-950/72 mix-blend-multiply"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-orange-100 mb-10 leading-relaxed">
            Join thousands of successful sellers on E-Shop. List your products today and reach millions of eager customers worldwide.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Register as User
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;