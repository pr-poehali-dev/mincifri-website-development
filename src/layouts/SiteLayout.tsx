import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CartDrawer, { CartEntry } from '@/components/CartDrawer';
import { ShopItem } from '@/data/shopData';
import { store } from '@/store/appStore';
import Icon from '@/components/ui/icon';

export default function SiteLayout() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  const handleOrder = (name: string, phone: string, email: string) => {
    const total = cart.reduce((sum, e) => sum + e.item.price * e.qty, 0);
    store.addOrder({
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      name, phone, email,
      items: [...cart],
      total,
      status: 'new',
    });
    setCart([]);
  };

  const cartIds = cart.map(e => e.item.id);
  const cartCount = cart.reduce((sum, e) => sum + e.qty, 0);

  return (
    <div className="min-h-screen font-golos flex flex-col">
      <SiteHeader
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Outlet context={{ onAddToCart: handleAddToCart, cartIds }} />
      </main>

      <SiteFooter />

      {cartCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-cyan to-brand-blue text-white text-sm font-semibold rounded-2xl shadow-2xl hover:scale-105 transition-all"
        >
          <Icon name="ShoppingCart" size={18} />
          Корзина · {cartCount}
        </button>
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onRemove={handleRemoveFromCart}
          onQtyChange={handleQtyChange}
          onClose={() => setCartOpen(false)}
          onOrder={handleOrder}
        />
      )}
    </div>
  );
}
