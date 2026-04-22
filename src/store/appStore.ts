import { useState, useCallback, useEffect } from 'react';
import { initialNews, NewsItem } from '@/data/newsData';
import { shopItems as initialShopItems, ShopItem } from '@/data/shopData';
import { CartEntry } from '@/components/CartDrawer';

export interface Order {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  items: CartEntry[];
  total: number;
  status: 'new' | 'processing' | 'done' | 'cancelled';
}

// Simple singleton store using module-level state
let _news: NewsItem[] = initialNews;
let _products: ShopItem[] = initialShopItems;
let _orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-04-20',
    name: 'Иван Петров',
    phone: '+7 900 123-45-67',
    email: 'ivan@company.ru',
    items: [
      { item: initialShopItems[0], qty: 2 },
      { item: initialShopItems[10], qty: 1 },
    ],
    total: initialShopItems[0].price * 2 + initialShopItems[10].price,
    status: 'new',
  },
  {
    id: 'ORD-002',
    date: '2026-04-19',
    name: 'ООО «ТехноГрупп»',
    phone: '+7 495 000-11-22',
    email: 'order@technogroup.ru',
    items: [{ item: initialShopItems[11], qty: 1 }],
    total: initialShopItems[11].price,
    status: 'processing',
  },
  {
    id: 'ORD-003',
    date: '2026-04-18',
    name: 'Мария Сидорова',
    phone: '+7 912 333-44-55',
    email: 'maria@gov.ru',
    items: [{ item: initialShopItems[8], qty: 3 }],
    total: initialShopItems[8].price * 3,
    status: 'done',
  },
];

const _listeners = new Set<() => void>();
const notify = () => _listeners.forEach(fn => fn());

export const store = {
  getNews: () => _news,
  getProducts: () => _products,
  getOrders: () => _orders,

  addNews: (item: NewsItem) => { _news = [item, ..._news]; notify(); },
  updateNews: (item: NewsItem) => { _news = _news.map(n => n.id === item.id ? item : n); notify(); },
  deleteNews: (id: string) => { _news = _news.filter(n => n.id !== id); notify(); },

  addProduct: (item: ShopItem) => { _products = [..._products, item]; notify(); },
  updateProduct: (item: ShopItem) => { _products = _products.map(p => p.id === item.id ? item : p); notify(); },
  deleteProduct: (id: string) => { _products = _products.filter(p => p.id !== id); notify(); },

  addOrder: (order: Order) => { _orders = [order, ..._orders]; notify(); },
  updateOrderStatus: (id: string, status: Order['status']) => {
    _orders = _orders.map(o => o.id === id ? { ...o, status } : o);
    notify();
  },

  subscribe: (fn: () => void) => {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
};

export function useStore() {
  const [, forceUpdate] = useState(0);
  const rerender = useCallback(() => forceUpdate(n => n + 1), []);

  useEffect(() => {
    return store.subscribe(rerender);
  }, [rerender]);

  return {
    news: store.getNews(),
    products: store.getProducts(),
    orders: store.getOrders(),
  };
}