import { useState } from 'react';
import { shopItems, categoryLabels, categoryIcons, ShopItem } from '@/data/shopData';
import Icon from '@/components/ui/icon';

interface ShopSectionProps {
  onAddToCart: (item: ShopItem) => void;
  cartIds: string[];
}

type CategoryFilter = ShopItem['category'] | 'all';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

export default function ShopSection({ onAddToCart, cartIds }: ShopSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = shopItems.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories: { key: CategoryFilter; label: string; icon: string }[] = [
    { key: 'all', label: 'Все товары', icon: 'Grid3X3' },
    ...Object.entries(categoryLabels).map(([key, label]) => ({
      key: key as ShopItem['category'],
      label,
      icon: categoryIcons[key as ShopItem['category']],
    })),
  ];

  return (
    <section id="shop" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="section-divider w-12" />
          <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Маркетплейс</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-brand-navy">
              Услуги и оборудование
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg">
              Официальные сервисы Минцифры: электронные подписи, ПО из реестра, консультации по цифровизации и сертифицированное оборудование ИБ.
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-brand-light hover:text-brand-blue'
              }`}
            >
              <Icon name={cat.icon} fallback="Tag" size={14} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">{filtered.length} позиций</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-30" />
            <p>Ничего не найдено. Попробуйте другой запрос.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(item => {
              const inCart = cartIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`relative bg-white border rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 card-hover ${
                    item.popular
                      ? 'border-brand-blue/30 shadow-lg shadow-brand-blue/8'
                      : 'border-gray-100 shadow-sm'
                  }`}
                >
                  {/* Popular ribbon */}
                  {item.popular && (
                    <div className="absolute -top-px -right-px">
                      <div className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                        Популярный
                      </div>
                    </div>
                  )}

                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 flex items-center justify-center">
                      <Icon name={item.icon} fallback="Package" size={22} className="text-brand-blue" />
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Name + desc */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-navy text-sm leading-snug mb-1.5">{item.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-1">
                    {item.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-1 h-1 rounded-full bg-brand-cyan flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="border-t border-gray-100 pt-3 flex items-end justify-between gap-2">
                    <div>
                      <div className="font-oswald font-bold text-xl text-brand-navy">{formatPrice(item.price)}</div>
                      <div className="text-gray-400 text-[10px]">за {item.unit}</div>
                    </div>
                    <button
                      onClick={() => onAddToCart(item)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        inCart
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-90 hover:scale-105 shadow-md shadow-brand-blue/20'
                      }`}
                    >
                      <Icon name={inCart ? 'Check' : 'ShoppingCart'} size={13} />
                      {inCart ? 'В корзине' : 'Добавить'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Security hardware highlight */}
        {(activeCategory === 'all' || activeCategory === 'security') && (
          <div className="mt-12 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0">
              <img
                src="https://cdn.poehali.dev/projects/929fa1c1-14f1-495f-bccd-a74f836517fe/files/c5972989-b4a0-4e08-afcf-12a2f8346062.jpg"
                alt="ИБ оборудование"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 to-brand-navy/60" />
            </div>
            <div className="relative p-8 md:p-12 text-white max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Icon name="ShieldAlert" size={16} className="text-red-400" />
                </div>
                <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">Оборудование ИБ</span>
              </div>
              <h3 className="font-oswald font-bold text-3xl mb-3">Сертифицированные решения по кибербезопасности</h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Всё оборудование сертифицировано ФСТЭК и ФСБ России. Поставки по государственным контрактам. Соответствие требованиям 187-ФЗ о КИИ.
              </p>
              <div className="flex flex-wrap gap-3">
                {['ФСТЭК сертификат', 'ФСБ лицензия', '187-ФЗ КИИ', 'ГОСТ Р'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
