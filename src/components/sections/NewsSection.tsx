import { useState } from 'react';
import { NewsItem } from '@/data/newsData';
import Icon from '@/components/ui/icon';

interface NewsSectionProps {
  news: NewsItem[];
}

const categories = ['Все', 'Цифровые сервисы', 'Программы', 'Инфраструктура', 'Искусственный интеллект'];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function NewsSection({ news }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const published = news.filter(n => n.published);
  const filtered = selectedCategory === 'Все'
    ? published
    : published.filter(n => n.category === selectedCategory);

  return (
    <section id="news" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="section-divider w-12" />
          <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Пресс-центр</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-brand-navy">
            Новости<br />и события
          </h2>
          <div className="text-gray-400 text-sm">
            {published.length} материалов
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Icon name="Newspaper" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Новостей в этой категории пока нет</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Featured (first item larger) */}
            {filtered.slice(0, 1).map(item => (
              <div key={item.id} className="xl:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm card-hover group">
                {item.image && (
                  <div className="h-52 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                {!item.image && (
                  <div className="h-52 bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
                    <Icon name="Newspaper" size={48} className="text-white/30" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-3 py-1 bg-brand-light text-brand-blue rounded-full font-medium">{item.category}</span>
                    <span className="text-gray-400 text-xs">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="font-oswald font-bold text-xl text-brand-navy mb-2 leading-tight">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.excerpt}</p>
                  {expandedId === item.id && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 border-t border-gray-100 pt-4">{item.content}</p>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="text-brand-blue text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {expandedId === item.id ? 'Свернуть' : 'Читать далее'}
                    <Icon name={expandedId === item.id ? 'ChevronUp' : 'ChevronRight'} size={14} />
                  </button>
                </div>
              </div>
            ))}

            {/* Rest */}
            {filtered.slice(1).map(item => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover group">
                {item.image ? (
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center">
                    <Icon name="Newspaper" size={36} className="text-white/20" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-brand-light text-brand-blue rounded-full">{item.category}</span>
                    <span className="text-gray-400 text-xs">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="font-oswald font-bold text-lg text-brand-navy mb-2 leading-tight">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{item.excerpt}</p>
                  {expandedId === item.id && (
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 border-t border-gray-100 pt-3">{item.content}</p>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="text-brand-blue text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {expandedId === item.id ? 'Свернуть' : 'Подробнее'}
                    <Icon name={expandedId === item.id ? 'ChevronUp' : 'ChevronRight'} size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
