import { useState } from 'react';
import { ShopItem } from '@/data/shopData';
import Icon from '@/components/ui/icon';

export interface CartEntry {
  item: ShopItem;
  qty: number;
}

interface CartDrawerProps {
  cart: CartEntry[];
  onRemove: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
  onClose: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

export default function CartDrawer({ cart, onRemove, onQtyChange, onClose }: CartDrawerProps) {
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const total = cart.reduce((sum, e) => sum + e.item.price * e.qty, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-navy to-brand-blue text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Icon name="ShoppingCart" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-oswald font-bold text-lg">Корзина</h2>
              <p className="text-white/60 text-xs">{cart.length} позиций</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
            <Icon name="X" size={18} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {ordered ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="CheckCircle" size={40} className="text-green-500" />
              </div>
              <h3 className="font-oswald font-bold text-2xl text-brand-navy">Заявка принята!</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Ваша заявка передана в обработку. Менеджер свяжется с вами в течение 1 рабочего дня.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Закрыть
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <Icon name="ShoppingCart" size={56} className="opacity-20" />
              <p className="text-sm">Корзина пуста</p>
              <button onClick={onClose} className="text-brand-blue text-sm font-medium hover:underline">
                Вернуться к каталогу
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Items */}
              {cart.map(entry => (
                <div key={entry.item.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={entry.item.icon} fallback="Package" size={18} className="text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-navy text-sm font-semibold leading-tight">{entry.item.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">за {entry.item.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQtyChange(entry.item.id, Math.max(1, entry.qty - 1))}
                          className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-colors"
                        >
                          <Icon name="Minus" size={11} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{entry.qty}</span>
                        <button
                          onClick={() => onQtyChange(entry.item.id, entry.qty + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-colors"
                        >
                          <Icon name="Plus" size={11} />
                        </button>
                      </div>
                      <span className="font-oswald font-bold text-brand-navy text-sm">
                        {formatPrice(entry.item.price * entry.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(entry.item.id)}
                    className="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="bg-brand-light rounded-2xl p-4 flex items-center justify-between">
                <span className="text-gray-600 font-medium text-sm">Итого:</span>
                <span className="font-oswald font-bold text-2xl text-brand-navy">{formatPrice(total)}</span>
              </div>

              {/* Order form */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <h4 className="font-semibold text-brand-navy mb-3 text-sm">Оформить заявку</h4>
                <form onSubmit={handleOrder} className="flex flex-col gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя *"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Телефон *"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
                  >
                    <Icon name="Send" size={16} />
                    Отправить заявку
                  </button>
                  <p className="text-center text-gray-400 text-[10px]">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
