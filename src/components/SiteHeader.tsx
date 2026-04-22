import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface SiteHeaderProps {
  cartCount?: number;
  onCartOpen?: () => void;
}

const navItems = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'О министерстве' },
  { path: '/directions', label: 'Направления' },
  { path: '/projects', label: 'Проекты' },
  { path: '/shop', label: 'Магазин' },
  { path: '/news', label: 'Новости' },
  { path: '/contacts', label: 'Контакты' },
];

export default function SiteHeader({ cartCount = 0, onCartOpen }: SiteHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const headerBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/10';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      {/* Top bar */}
      <div className="bg-brand-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="opacity-80">Официальный сайт Минцифры России</span>
          <div className="flex items-center gap-4">
            <a href="tel:88002500999" className="hover:text-brand-cyan transition-colors flex items-center gap-1">
              <Icon name="Phone" size={11} />
              <span>8 800 250-09-99</span>
            </a>
            <button
              onClick={() => navigate('/admin')}
              className="hover:text-brand-cyan transition-colors flex items-center gap-1"
            >
              <Icon name="Settings" size={11} />
              <span>Админка</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`transition-all duration-300 ${isHome && !scrolled ? 'bg-white/10 backdrop-blur-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Icon name="Cpu" size={20} className="text-white" />
            </div>
            <div className={`hidden sm:block ${isHome && !scrolled ? 'text-white' : 'text-brand-navy'}`}>
              <div className="font-oswald font-bold text-base leading-tight">МИНЦИФРЫ</div>
              <div className="text-[10px] opacity-70 leading-tight">РОССИЯ</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-brand-blue bg-brand-blue/8'
                    : isHome && !scrolled
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5'
                } ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: cart + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onCartOpen}
              className={`relative p-2.5 rounded-xl transition-all ${isHome && !scrolled ? 'text-white hover:bg-white/15' : 'text-brand-navy hover:bg-brand-light'}`}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-cyan text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/contacts')}
              className="px-5 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:scale-105 transition-all shadow-md shadow-brand-blue/25"
            >
              Обратная связь
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onCartOpen}
              className={`relative p-2 rounded-lg ${isHome && !scrolled ? 'text-white' : 'text-brand-navy'}`}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-cyan text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className={`p-2 rounded-lg ${isHome && !scrolled ? 'text-white' : 'text-brand-navy'}`}
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
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'bg-brand-blue text-white' : 'text-gray-700 hover:bg-brand-light'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/admin')}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 border-t border-gray-100 mt-1 pt-3 flex items-center gap-2"
            >
              <Icon name="Settings" size={14} />
              Панель управления
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
