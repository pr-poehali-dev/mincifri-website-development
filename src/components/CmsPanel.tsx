import { useState } from 'react';
import { NewsItem } from '@/data/newsData';
import Icon from '@/components/ui/icon';

interface CmsPanelProps {
  news: NewsItem[];
  onAdd: (item: NewsItem) => void;
  onUpdate: (item: NewsItem) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const emptyForm: Omit<NewsItem, 'id'> = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  category: 'Цифровые сервисы',
  excerpt: '',
  content: '',
  published: true,
};

const categoryOptions = ['Цифровые сервисы', 'Программы', 'Инфраструктура', 'Искусственный интеллект', 'Кибербезопасность'];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function CmsPanel({ news, onAdd, onUpdate, onDelete, onClose }: CmsPanelProps) {
  const [view, setView] = useState<'list' | 'new' | 'edit'>('list');
  const [form, setForm] = useState<Omit<NewsItem, 'id'>>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);

  const handleEdit = (item: NewsItem) => {
    const { id, ...rest } = item;
    setEditId(id);
    setForm(rest);
    setView('edit');
  };

  const handleSave = () => {
    if (!form.title || !form.excerpt) return;
    if (view === 'new') {
      onAdd({ ...form, id: Date.now().toString() });
    } else if (view === 'edit' && editId) {
      onUpdate({ ...form, id: editId });
    }
    setForm(emptyForm);
    setView('list');
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setView('list');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-navy to-brand-blue text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="Newspaper" size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-oswald font-bold text-lg">Управление новостями</h2>
              <p className="text-white/60 text-xs">{news.length} материалов</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {view === 'list' && (
              <button
                onClick={() => { setForm(emptyForm); setView('new'); }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-sm rounded-xl transition-colors"
              >
                <Icon name="Plus" size={16} />
                Добавить
              </button>
            )}
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
              <Icon name="X" size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {view === 'list' && (
            <div className="flex flex-col gap-3">
              {news.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Icon name="Newspaper" size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Новостей пока нет. Добавьте первую!</p>
                </div>
              )}
              {news.map(item => (
                <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-blue/30 hover:bg-brand-light/30 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-xs text-brand-blue font-medium">{item.category}</span>
                      <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
                    </div>
                    <h3 className="font-semibold text-brand-navy text-sm leading-tight mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-1">{item.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-8 h-8 rounded-lg bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Icon name="Pencil" size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(view === 'new' || view === 'edit') && (
            <div className="flex flex-col gap-5">
              <h3 className="font-oswald font-bold text-xl text-brand-navy">
                {view === 'new' ? 'Новая публикация' : 'Редактировать публикацию'}
              </h3>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Заголовок *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Введите заголовок новости..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Категория</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors bg-white"
                  >
                    {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Дата публикации</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Краткое описание * <span className="text-gray-400 font-normal">(отображается в списке)</span></label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Краткое описание для анонса..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Полный текст</label>
                <textarea
                  rows={5}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Полный текст новости..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, published: !form.published })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-brand-blue' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-sm text-gray-600">{form.published ? 'Опубликовано' : 'Черновик'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {(view === 'new' || view === 'edit') && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button onClick={handleCancel} className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={!form.title || !form.excerpt}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Icon name="Save" size={15} />
              {view === 'new' ? 'Опубликовать' : 'Сохранить'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
