import { useState } from 'react';
import Icon from '@/components/ui/icon';

const contacts = [
  { icon: 'MapPin', label: 'Адрес', value: 'г. Москва, Пресненская набережная, д. 10, стр. 2', sub: 'Деловой центр «Москва-Сити»' },
  { icon: 'Phone', label: 'Телефон приёмной', value: '+7 (495) 771-80-00', sub: 'Пн–Пт: 9:00–18:00' },
  { icon: 'Phone', label: 'Горячая линия', value: '8 800 250-09-99', sub: 'Бесплатно по России' },
  { icon: 'Mail', label: 'Email', value: 'info@digital.gov.ru', sub: 'Официальная почта' },
];

const socials = [
  { icon: 'MessageCircle', label: 'Telegram', color: 'hover:bg-blue-500' },
  { icon: 'Youtube', label: 'YouTube', color: 'hover:bg-red-500' },
  { icon: 'Rss', label: 'ВКонтакте', color: 'hover:bg-indigo-500' },
];

export default function ContactsSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contacts" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="section-divider w-12" />
          <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Контакты</span>
        </div>
        <h2 className="font-oswald font-bold text-4xl md:text-5xl text-brand-navy mb-16">
          Обратная связь<br />и контакты
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contacts.map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-5 hover:bg-brand-light transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center mb-3">
                    <Icon name={c.icon} fallback="Info" size={18} className="text-white" />
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{c.label}</div>
                  <div className="font-semibold text-brand-navy text-sm">{c.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-brand-navy/5 to-brand-blue/10 h-48 flex items-center justify-center border-2 border-dashed border-brand-blue/20 mb-6">
              <div className="text-center text-gray-400">
                <Icon name="Map" size={36} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Интерактивная карта</p>
                <p className="text-xs mt-1">Пресненская наб., 10, стр. 2</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Мы в соцсетях:</span>
              {socials.map((s, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 ${s.color} hover:text-white transition-all`}
                >
                  <Icon name={s.icon} fallback="Link" size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-gradient-to-br from-brand-navy to-brand-blue rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-brand-cyan/10 translate-y-16 -translate-x-16" />

            <div className="relative">
              <h3 className="font-oswald font-bold text-2xl mb-2">Написать в министерство</h3>
              <p className="text-white/60 text-sm mb-6">Мы ответим в течение 3 рабочих дней</p>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center">
                    <Icon name="CheckCircle" size={32} className="text-green-400" />
                  </div>
                  <p className="text-white font-semibold text-lg">Обращение отправлено!</p>
                  <p className="text-white/60 text-sm text-center">Мы ответим вам в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-xs mb-1.5 block">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-xs mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Тема обращения</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="Укажите тему..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Сообщение *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Опишите ваш вопрос или обращение..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-brand-cyan to-white/20 text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Icon name="Send" size={16} />
                    Отправить обращение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
