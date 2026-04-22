import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, store, Order } from '@/store/appStore';
import { NewsItem } from '@/data/newsData';
import { ShopItem, categoryLabels } from '@/data/shopData';
import Icon from '@/components/ui/icon';

type Tab = 'dashboard' | 'news' | 'products' | 'orders' | 'content';

const formatPrice = (p: number) => new Intl.NumberFormat('ru-RU').format(p) + ' ₽';
const formatDate = (d: string) => new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });

const orderStatusLabels: Record<Order['status'], string> = {
  new: 'Новая',
  processing: 'В обработке',
  done: 'Выполнена',
  cancelled: 'Отменена',
};
const orderStatusColors: Record<Order['status'], string> = {
  new: 'bg-blue-100 text-blue-700',
  processing: 'bg-amber-100 text-amber-700',
  done: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const tabs = [
  { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
  { id: 'news', label: 'Новости', icon: 'Newspaper' },
  { id: 'products', label: 'Товары', icon: 'Package' },
  { id: 'orders', label: 'Заявки', icon: 'ShoppingBag' },
  { id: 'content', label: 'Контент', icon: 'FileEdit' },
] as const;

// ─── News form ───────────────────────────────────────────────────────────────
const emptyNews: Omit<NewsItem, 'id'> = {
  title: '', date: new Date().toISOString().split('T')[0],
  category: 'Цифровые сервисы', excerpt: '', content: '', published: true,
};
const newsCategories = ['Цифровые сервисы', 'Программы', 'Инфраструктура', 'Искусственный интеллект', 'Кибербезопасность'];

// ─── Product form ─────────────────────────────────────────────────────────────
const emptyProduct: Omit<ShopItem, 'id'> = {
  name: '', category: 'signature', price: 0, unit: 'шт.',
  desc: '', features: [], icon: 'Package',
};

export default function AdminPage() {
  const navigate = useNavigate();
  const { news, products, orders } = useStore();
  const [tab, setTab] = useState<Tab>('dashboard');

  // News state
  const [newsForm, setNewsForm] = useState<Omit<NewsItem, 'id'>>(emptyNews);
  const [newsEditId, setNewsEditId] = useState<string | null>(null);
  const [newsView, setNewsView] = useState<'list' | 'form'>('list');

  // Product state
  const [prodForm, setProdForm] = useState<Omit<ShopItem, 'id'>>(emptyProduct);
  const [prodEditId, setProdEditId] = useState<string | null>(null);
  const [prodView, setProdView] = useState<'list' | 'form'>('list');
  const [prodFeaturesRaw, setProdFeaturesRaw] = useState('');

  // Content state
  const [contentData, setContentData] = useState({
    heroTitle: 'Цифровое будущее строится сегодня',
    heroSubtitle: 'Развиваем цифровую экономику, создаём удобные государственные сервисы и строим технологическую инфраструктуру для всей страны.',
    aboutTitle: 'Ведём страну в цифровую эпоху',
    aboutText: 'Министерство цифрового развития, связи и массовых коммуникаций Российской Федерации — федеральный орган исполнительной власти, отвечающий за цифровизацию государства и экономики.',
    phone1: '+7 (495) 771-80-00',
    phone2: '8 800 250-09-99',
    email: 'info@digital.gov.ru',
    address: 'г. Москва, Пресненская набережная, д. 10, стр. 2',
  });
  const [contentSaved, setContentSaved] = useState(false);

  // ── Dashboard stats ─────────────────────────────────────────────
  const totalRevenue = orders.reduce((s, o) => s + (o.status !== 'cancelled' ? o.total : 0), 0);
  const newOrders = orders.filter(o => o.status === 'new').length;

  // ── News handlers ───────────────────────────────────────────────
  const saveNews = () => {
    if (!newsForm.title || !newsForm.excerpt) return;
    if (newsEditId) store.updateNews({ ...newsForm, id: newsEditId });
    else store.addNews({ ...newsForm, id: Date.now().toString() });
    setNewsForm(emptyNews); setNewsEditId(null); setNewsView('list');
  };
  const editNews = (item: NewsItem) => {
    const { id, ...rest } = item;
    setNewsEditId(id); setNewsForm(rest); setNewsView('form');
  };

  // ── Product handlers ────────────────────────────────────────────
  const saveProd = () => {
    if (!prodForm.name || !prodForm.price) return;
    const features = prodFeaturesRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const item = { ...prodForm, features };
    if (prodEditId) store.updateProduct({ ...item, id: prodEditId });
    else store.addProduct({ ...item, id: Date.now().toString() });
    setProdForm(emptyProduct); setProdEditId(null); setProdFeaturesRaw(''); setProdView('list');
  };
  const editProd = (item: ShopItem) => {
    const { id, ...rest } = item;
    setProdEditId(id); setProdForm(rest);
    setProdFeaturesRaw(item.features.join('\n')); setProdView('form');
  };

  // ── Content handler ─────────────────────────────────────────────
  const saveContent = () => {
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-golos">
      {/* Top bar */}
      <div className="bg-brand-navy text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
            <Icon name="Cpu" size={16} className="text-white" />
          </div>
          <span className="font-oswald font-bold">МИНЦИФРЫ · Панель управления</span>
        </div>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
          <Icon name="ExternalLink" size={14} />
          На сайт
        </button>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-4 flex-shrink-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors text-left ${
                tab === t.id
                  ? 'bg-brand-blue/8 text-brand-blue border-r-2 border-brand-blue'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-brand-navy'
              }`}
            >
              <Icon name={t.icon} fallback="Circle" size={16} />
              {t.label}
              {t.id === 'orders' && newOrders > 0 && (
                <span className="ml-auto w-5 h-5 bg-brand-cyan text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {newOrders}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="font-oswald font-bold text-2xl text-brand-navy mb-6">Дашборд</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Новостей', value: news.length, icon: 'Newspaper', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Товаров', value: products.length, icon: 'Package', color: 'from-violet-500 to-blue-500' },
                  { label: 'Заявок', value: orders.length, icon: 'ShoppingBag', color: 'from-amber-500 to-orange-500' },
                  { label: 'Выручка', value: formatPrice(totalRevenue), icon: 'TrendingUp', color: 'from-green-500 to-teal-500' },
                ].map((s, i) => (
                  <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white`}>
                    <Icon name={s.icon} fallback="Star" size={22} className="mb-3 opacity-80" />
                    <div className="font-oswald font-bold text-2xl">{s.value}</div>
                    <div className="text-white/70 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-semibold text-brand-navy mb-4 flex items-center gap-2">
                  <Icon name="ShoppingBag" size={16} className="text-brand-blue" />
                  Последние заявки
                </h2>
                <div className="flex flex-col gap-2">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="font-medium text-sm text-brand-navy">{o.name}</span>
                        <span className="text-gray-400 text-xs ml-2">{formatDate(o.date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{formatPrice(o.total)}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${orderStatusColors[o.status]}`}>
                          {orderStatusLabels[o.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── NEWS ── */}
          {tab === 'news' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-oswald font-bold text-2xl text-brand-navy">
                  {newsView === 'list' ? 'Управление новостями' : newsEditId ? 'Редактировать новость' : 'Новая новость'}
                </h1>
                {newsView === 'list' ? (
                  <button
                    onClick={() => { setNewsForm(emptyNews); setNewsEditId(null); setNewsView('form'); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all"
                  >
                    <Icon name="Plus" size={15} />
                    Добавить
                  </button>
                ) : (
                  <button onClick={() => { setNewsView('list'); setNewsEditId(null); }} className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-navy transition-colors">
                    <Icon name="ArrowLeft" size={15} />
                    Назад
                  </button>
                )}
              </div>

              {newsView === 'list' ? (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {news.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <Icon name="Newspaper" size={36} className="mx-auto mb-3 opacity-20" />
                      <p>Новостей пока нет</p>
                    </div>
                  )}
                  {news.map(item => (
                    <div key={item.id} className="flex items-start gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-xs text-brand-blue">{item.category}</span>
                          <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
                        </div>
                        <p className="font-medium text-brand-navy text-sm">{item.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{item.excerpt}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => editNews(item)} className="w-8 h-8 rounded-lg bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white flex items-center justify-center transition-colors">
                          <Icon name="Pencil" size={13} />
                        </button>
                        <button onClick={() => store.deleteNews(item.id)} className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-colors">
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 max-w-2xl">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Заголовок *</label>
                    <input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                      placeholder="Введите заголовок..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Категория</label>
                      <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue bg-white">
                        {newsCategories.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Дата</label>
                      <input type="date" value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Анонс *</label>
                    <textarea rows={2} value={newsForm.excerpt} onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                      placeholder="Краткое описание для списка..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue resize-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Полный текст</label>
                    <textarea rows={5} value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                      placeholder="Полный текст новости..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue resize-none" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setNewsForm({ ...newsForm, published: !newsForm.published })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${newsForm.published ? 'bg-brand-blue' : 'bg-gray-300'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${newsForm.published ? 'translate-x-5' : ''}`} />
                    </button>
                    <span className="text-sm text-gray-600">{newsForm.published ? 'Опубликовано' : 'Черновик'}</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => { setNewsView('list'); setNewsEditId(null); }}
                      className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Отмена</button>
                    <button onClick={saveNews} disabled={!newsForm.title || !newsForm.excerpt}
                      className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 flex items-center gap-2">
                      <Icon name="Save" size={14} />
                      {newsEditId ? 'Сохранить' : 'Опубликовать'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-oswald font-bold text-2xl text-brand-navy">
                  {prodView === 'list' ? 'Управление товарами' : prodEditId ? 'Редактировать товар' : 'Новый товар'}
                </h1>
                {prodView === 'list' ? (
                  <button onClick={() => { setProdForm(emptyProduct); setProdEditId(null); setProdFeaturesRaw(''); setProdView('form'); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
                    <Icon name="Plus" size={15} />
                    Добавить товар
                  </button>
                ) : (
                  <button onClick={() => { setProdView('list'); setProdEditId(null); }} className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-navy transition-colors">
                    <Icon name="ArrowLeft" size={15} />
                    Назад
                  </button>
                )}
              </div>

              {prodView === 'list' ? (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {products.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} fallback="Package" size={18} className="text-brand-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-brand-navy text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">{categoryLabels[item.category]} · {formatPrice(item.price)} / {item.unit}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => editProd(item)} className="w-8 h-8 rounded-lg bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white flex items-center justify-center transition-colors">
                          <Icon name="Pencil" size={13} />
                        </button>
                        <button onClick={() => store.deleteProduct(item.id)} className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-colors">
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 max-w-2xl">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Название *</label>
                    <input type="text" value={prodForm.name} onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
                      placeholder="Название товара или услуги..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Категория</label>
                      <select value={prodForm.category} onChange={e => setProdForm({ ...prodForm, category: e.target.value as ShopItem['category'] })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue bg-white">
                        {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Цена (₽) *</label>
                      <input type="number" value={prodForm.price || ''} onChange={e => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                        placeholder="0" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Единица</label>
                      <input type="text" value={prodForm.unit} onChange={e => setProdForm({ ...prodForm, unit: e.target.value })}
                        placeholder="год / шт. / проект" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Описание</label>
                    <textarea rows={3} value={prodForm.desc} onChange={e => setProdForm({ ...prodForm, desc: e.target.value })}
                      placeholder="Краткое описание товара или услуги..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue resize-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Характеристики <span className="text-gray-400 font-normal">(каждая с новой строки)</span>
                    </label>
                    <textarea rows={4} value={prodFeaturesRaw} onChange={e => setProdFeaturesRaw(e.target.value)}
                      placeholder={"Сертификат ФСТЭК\nПропускная 1 Гбит/с\nVPN-туннели"} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue resize-none font-mono" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => { setProdView('list'); setProdEditId(null); }}
                      className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Отмена</button>
                    <button onClick={saveProd} disabled={!prodForm.name || !prodForm.price}
                      className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 flex items-center gap-2">
                      <Icon name="Save" size={14} />
                      {prodEditId ? 'Сохранить' : 'Добавить'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ORDERS ── */}
          {tab === 'orders' && (
            <div>
              <h1 className="font-oswald font-bold text-2xl text-brand-navy mb-6">Заявки из магазина</h1>
              <div className="flex flex-col gap-4">
                {orders.length === 0 && (
                  <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
                    <Icon name="ShoppingBag" size={40} className="mx-auto mb-3 opacity-20" />
                    <p>Заявок пока нет</p>
                  </div>
                )}
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-oswald font-bold text-brand-navy">{order.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${orderStatusColors[order.status]}`}>
                            {orderStatusLabels[order.status]}
                          </span>
                        </div>
                        <p className="font-semibold text-sm">{order.name}</p>
                        <p className="text-gray-500 text-xs">{order.email} · {order.phone}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{formatDate(order.date)}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-oswald font-bold text-xl text-brand-navy">{formatPrice(order.total)}</div>
                        <select
                          value={order.status}
                          onChange={e => store.updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="mt-2 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-blue bg-white"
                        >
                          {Object.entries(orderStatusLabels).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5">
                      {order.items.map((e, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{e.item.name} × {e.qty}</span>
                          <span className="text-brand-navy font-medium">{formatPrice(e.item.price * e.qty)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CONTENT ── */}
          {tab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-oswald font-bold text-2xl text-brand-navy">Управление контентом</h1>
                {contentSaved && (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium animate-fade-in">
                    <Icon name="CheckCircle" size={15} />
                    Сохранено
                  </span>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
                {/* Hero */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h2 className="font-semibold text-brand-navy mb-4 flex items-center gap-2">
                    <Icon name="Layout" size={15} className="text-brand-blue" />
                    Главная страница (Hero)
                  </h2>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Заголовок</label>
                      <input type="text" value={contentData.heroTitle}
                        onChange={e => setContentData({ ...contentData, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Подзаголовок</label>
                      <textarea rows={3} value={contentData.heroSubtitle}
                        onChange={e => setContentData({ ...contentData, heroSubtitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue resize-none" />
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h2 className="font-semibold text-brand-navy mb-4 flex items-center gap-2">
                    <Icon name="Info" size={15} className="text-brand-blue" />
                    О министерстве
                  </h2>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Заголовок раздела</label>
                      <input type="text" value={contentData.aboutTitle}
                        onChange={e => setContentData({ ...contentData, aboutTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Описание</label>
                      <textarea rows={4} value={contentData.aboutText}
                        onChange={e => setContentData({ ...contentData, aboutText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue resize-none" />
                    </div>
                  </div>
                </div>

                {/* Contacts */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:col-span-2">
                  <h2 className="font-semibold text-brand-navy mb-4 flex items-center gap-2">
                    <Icon name="Phone" size={15} className="text-brand-blue" />
                    Контактная информация
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Телефон приёмной', key: 'phone1' as const },
                      { label: 'Горячая линия', key: 'phone2' as const },
                      { label: 'Email', key: 'email' as const },
                      { label: 'Адрес', key: 'address' as const },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">{f.label}</label>
                        <input type="text" value={contentData[f.key]}
                          onChange={e => setContentData({ ...contentData, [f.key]: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={saveContent}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-md shadow-brand-blue/20">
                <Icon name="Save" size={16} />
                Сохранить изменения
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}