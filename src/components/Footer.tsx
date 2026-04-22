import Icon from '@/components/ui/icon';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const links = [
  { section: 'home', label: 'Главная' },
  { section: 'about', label: 'О министерстве' },
  { section: 'directions', label: 'Направления' },
  { section: 'projects', label: 'Проекты' },
  { section: 'shop', label: 'Магазин' },
  { section: 'news', label: 'Новости' },
  { section: 'contacts', label: 'Контакты' },
];

const portals = [
  { label: 'Госуслуги', url: '#' },
  { label: 'ГосТех', url: '#' },
  { label: 'Открытые данные', url: '#' },
  { label: 'Цифровая экономика', url: '#' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Top ticker */}
      <div className="bg-brand-blue/50 py-3 overflow-hidden">
        <div className="ticker-wrapper">
          <div className="animate-ticker inline-flex gap-16 text-sm text-white/70">
            {['Госуслуги', 'Цифровая экономика', 'ГосТех', 'Кибербезопасность', 'Умный город', 'ИИ в государстве', 'Широкополосный интернет', '5G сети', 'Цифровой профиль', 'Электронная подпись',
              'Госуслуги', 'Цифровая экономика', 'ГосТех', 'Кибербезопасность', 'Умный город', 'ИИ в государстве', 'Широкополосный интернет', '5G сети', 'Цифровой профиль', 'Электронная подпись'].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-cyan" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
                <Icon name="Cpu" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-oswald font-bold">МИНЦИФРЫ</div>
                <div className="text-white/50 text-xs">РОССИЯ</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Министерство цифрового развития, связи и массовых коммуникаций Российской Федерации
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/60">Разделы</h4>
            <div className="flex flex-col gap-2.5">
              {links.map(link => (
                <button
                  key={link.section}
                  onClick={() => onNavigate(link.section)}
                  className="text-left text-white/70 hover:text-brand-cyan text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/60">Порталы</h4>
            <div className="flex flex-col gap-2.5">
              {portals.map(p => (
                <a
                  key={p.label}
                  href={p.url}
                  className="text-white/70 hover:text-brand-cyan text-sm transition-colors flex items-center gap-1.5"
                >
                  {p.label}
                  <Icon name="ExternalLink" size={11} className="opacity-50" />
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/60">Связь</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="text-white/70">
                <div className="text-white/40 text-xs mb-0.5">Приёмная</div>
                +7 (495) 771-80-00
              </div>
              <div className="text-white/70">
                <div className="text-white/40 text-xs mb-0.5">Горячая линия</div>
                8 800 250-09-99
              </div>
              <div className="text-white/70">
                <div className="text-white/40 text-xs mb-0.5">Email</div>
                info@digital.gov.ru
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© 2026 Министерство цифрового развития, связи и массовых коммуникаций РФ</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/70 transition-colors">Карта сайта</a>
            <a href="#" className="hover:text-white/70 transition-colors">Доступность</a>
          </div>
        </div>
      </div>
    </footer>
  );
}