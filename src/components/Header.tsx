import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  cartCount?: number;
  onCartOpen?: () => void;
}

const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О министерстве' },
  { id: 'directions', label: 'Направления' },
  { id: 'projects', label: 'Проекты' },
  { id: 'shop', label: 'Магазин' },
  { id: 'news', label: 'Новости' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Header({ activeSection, onNavigate, cartCount = 0, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/10'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="bg-brand-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="opacity-80">Официальный сайт Минцифры России</span>
          <div className="flex items-center gap-4">
            <a href="tel:88002500999" className="hover:text-brand-cyan transition-colors flex items-center gap-1">
              <Icon name="Phone" size={11} />
              <span>8 800 250-09-99</span>
            </a>
            <button className="hover:text-brand-cyan transition-colors flex items-center gap-1">
              <Icon name="Globe" size={11} />
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`transition-all duration-300 ${scrolled ? '' : 'bg-white/10 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Icon name="Cpu" size={20} className="text-white" />
            </div>
            <div className={`hidden sm:block ${scrolled ? 'text-brand-navy' : 'text-white'}`}>
              <div className="font-oswald font-bold text-base leading-tight">МИНЦИФРЫ</div>
              <div className="text-[10px] opacity-70 leading-tight">РОССИЯ</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-brand-blue bg-brand-blue/8'
                    : scrolled
                    ? 'text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                } ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={onCartOpen}
              className={`relative p-2.5 rounded-xl transition-all ${scrolled ? 'text-brand-navy hover:bg-brand-light' : 'text-white hover:bg-white/15'}`}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-cyan text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('contacts')}
              className="px-5 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:scale-105 transition-all shadow-md shadow-brand-blue/25"
            >
              Обратная связь
            </button>
          </div>

          {/* Mobile: cart + menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onCartOpen}
              className={`relative p-2 rounded-lg ${scrolled ? 'text-brand-navy' : 'text-white'}`}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-cyan text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={`p-2 rounded-lg ${scrolled ? 'text-brand-navy' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-blue text-white'
                    : 'text-gray-700 hover:bg-brand-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}