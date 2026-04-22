import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DirectionsSection from '@/components/sections/DirectionsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ShopSection from '@/components/sections/ShopSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactsSection from '@/components/sections/ContactsSection';
import CmsPanel from '@/components/CmsPanel';
import CartDrawer, { CartEntry } from '@/components/CartDrawer';
import { initialNews, NewsItem } from '@/data/newsData';
import { ShopItem } from '@/data/shopData';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cmsOpen, setCmsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [cart, setCart] = useState<CartEntry[]>([]);

  useEffect(() => {
    const sections = ['about', 'directions', 'projects', 'shop', 'news', 'contacts'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection('home');
        });
      },
      { threshold: 0.1 }
    );
    const hero = document.getElementById('hero-anchor');
    if (hero) heroObserver.observe(hero);

    return () => { observer.disconnect(); heroObserver.disconnect(); };
  }, []);

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // News handlers
  const handleAddNews = (item: NewsItem) => setNews(prev => [item, ...prev]);
  const handleUpdateNews = (item: NewsItem) => setNews(prev => prev.map(n => n.id === item.id ? item : n));
  const handleDeleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));

  // Cart handlers
  const handleAddToCart = (item: ShopItem) => {
    setCart(prev => {
      const exists = prev.find(e => e.item.id === item.id);
      if (exists) return prev;
      return [...prev, { item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) =>
    setCart(prev => prev.filter(e => e.item.id !== id));

  const handleQtyChange = (id: string, qty: number) =>
    setCart(prev => prev.map(e => e.item.id === id ? { ...e, qty } : e));

  const cartIds = cart.map(e => e.item.id);
  const cartCount = cart.reduce((sum, e) => sum + e.qty, 0);

  return (
    <div className="min-h-screen font-golos">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <div id="hero-anchor">
        <HeroSection onNavigate={handleNavigate} />
      </div>

      <AboutSection />
      <DirectionsSection />
      <ProjectsSection />
      <ShopSection onAddToCart={handleAddToCart} cartIds={cartIds} />
      <NewsSection news={news} />
      <ContactsSection />
      <Footer onNavigate={handleNavigate} />

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Cart */}
        {cartCount > 0 && (
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-sm font-semibold rounded-2xl shadow-2xl hover:scale-105 transition-all"
          >
            <Icon name="ShoppingCart" size={18} />
            Корзина · {cartCount}
          </button>
        )}
        {/* CMS */}
        <button
          onClick={() => setCmsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-brand-blue/30 text-brand-blue text-sm font-semibold rounded-2xl shadow-xl hover:scale-105 transition-all"
        >
          <Icon name="Newspaper" size={18} />
          Управление новостями
        </button>
      </div>

      {/* Modals */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onRemove={handleRemoveFromCart}
          onQtyChange={handleQtyChange}
          onClose={() => setCartOpen(false)}
        />
      )}

      {cmsOpen && (
        <CmsPanel
          news={news}
          onAdd={handleAddNews}
          onUpdate={handleUpdateNews}
          onDelete={handleDeleteNews}
          onClose={() => setCmsOpen(false)}
        />
      )}
    </div>
  );
}
