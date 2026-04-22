import Icon from '@/components/ui/icon';

const directions = [
  {
    icon: 'Smartphone',
    title: 'Цифровые государственные сервисы',
    desc: 'Развитие портала Госуслуги, МФЦ нового поколения, электронный документооборот',
    color: 'from-blue-500 to-cyan-500',
    items: ['Портал Госуслуги', 'Электронная подпись', 'Цифровое удостоверение', 'Открытые данные'],
  },
  {
    icon: 'Brain',
    title: 'Искусственный интеллект',
    desc: 'Национальная стратегия развития ИИ, регулирование и стандарты, применение в госуправлении',
    color: 'from-violet-500 to-blue-500',
    items: ['Стратегия ИИ 2030', 'Этика ИИ', 'ИИ в медицине', 'Умные города'],
  },
  {
    icon: 'Shield',
    title: 'Кибербезопасность',
    desc: 'Защита критической информационной инфраструктуры, цифровой суверенитет',
    color: 'from-cyan-500 to-teal-500',
    items: ['Суверенный интернет', 'ГосСОПКА', 'Антивирусная защита', 'Сертификация ПО'],
  },
  {
    icon: 'Wifi',
    title: 'Цифровая инфраструктура',
    desc: 'Широкополосный интернет, 5G, спутниковая связь, ЦОД и облачные платформы',
    color: 'from-teal-500 to-green-500',
    items: ['Сеть 5G', 'Оптоволокно в сёла', 'Облачная платформа', 'Центры обработки данных'],
  },
  {
    icon: 'GraduationCap',
    title: 'Цифровое образование',
    desc: 'Подготовка IT-специалистов, цифровая грамотность населения, переквалификация',
    color: 'from-orange-500 to-amber-500',
    items: ['IT-университеты', 'Цифровая кафедра', 'Переобучение', 'Программирование в школах'],
  },
  {
    icon: 'TrendingUp',
    title: 'Цифровая экономика',
    desc: 'Поддержка IT-отрасли, экспорт ПО, развитие стартапов и технологического предпринимательства',
    color: 'from-rose-500 to-pink-500',
    items: ['Налоговые льготы IT', 'Техноэкспорт', 'Стартап-акселерация', 'Цифровой рубль'],
  },
];

export default function DirectionsSection() {
  return (
    <section id="directions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="section-divider w-12" />
          <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Деятельность</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-brand-navy">
            Направления<br />деятельности
          </h2>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Министерство работает по шести ключевым направлениям, охватывающим все аспекты цифровой трансформации страны.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((dir, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 card-hover group border border-gray-100">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dir.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Icon name={dir.icon} fallback="Star" size={24} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="font-oswald font-bold text-xl text-brand-navy mb-2">{dir.title}</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{dir.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {dir.items.map((item, j) => (
                  <span key={j} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-brand-light hover:text-brand-blue transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
