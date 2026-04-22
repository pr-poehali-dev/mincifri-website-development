import Icon from '@/components/ui/icon';

const values = [
  { icon: 'Shield', title: 'Надёжность', desc: 'Обеспечиваем безопасность данных граждан и устойчивость цифровой инфраструктуры страны.' },
  { icon: 'Zap', title: 'Инновации', desc: 'Внедряем передовые технологии: ИИ, блокчейн, квантовые вычисления в государственное управление.' },
  { icon: 'Users', title: 'Открытость', desc: 'Создаём прозрачные сервисы и вовлекаем граждан в цифровую трансформацию страны.' },
  { icon: 'Globe', title: 'Доступность', desc: 'Делаем цифровые услуги доступными для каждого жителя России, вне зависимости от региона.' },
];

const leadership = [
  { name: 'Максут Шадаев', position: 'Министр цифрового развития', avatar: '👤' },
  { name: 'Александр Иванов', position: 'Первый заместитель министра', avatar: '👤' },
  { name: 'Татьяна Михайлова', position: 'Заместитель по цифровым сервисам', avatar: '👤' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="section-divider w-12" />
          <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">О министерстве</span>
        </div>
        <h2 className="font-oswald font-bold text-4xl md:text-5xl text-brand-navy mb-6">
          Ведём страну<br />в цифровую эпоху
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mb-16 leading-relaxed">
          Министерство цифрового развития, связи и массовых коммуникаций Российской Федерации — федеральный орган исполнительной власти, отвечающий за цифровизацию государства и экономики.
        </p>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left: image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 h-80 lg:h-auto">
              <img
                src="https://cdn.poehali.dev/projects/929fa1c1-14f1-495f-bccd-a74f836517fe/files/c63e7793-5f18-4567-acfd-f0ddccd99a11.jpg"
                alt="Здание министерства"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-2xl p-4 text-white shadow-xl animate-pulse-glow">
              <div className="font-oswald font-bold text-3xl">2008</div>
              <div className="text-xs opacity-80">Год основания</div>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-col justify-center gap-6 pt-6">
            <p className="text-gray-600 leading-relaxed">
              Министерство осуществляет разработку и реализацию государственной политики в сфере информационных технологий, электросвязи, почтовой связи, массовых коммуникаций и СМИ.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Мы координируем реализацию национальной программы «Цифровая экономика», развиваем Госуслуги, обеспечиваем кибербезопасность и цифровой суверенитет страны.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {['Цифровая экономика', 'ИТ-образование', 'Кибербезопасность', 'Инфраструктура', 'Госуслуги'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-brand-light text-brand-blue rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((v, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center mb-4">
                <Icon name={v.icon} fallback="Star" size={22} className="text-white" />
              </div>
              <h3 className="font-oswald font-bold text-xl text-brand-navy mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Leadership */}
        <div className="bg-gradient-to-br from-brand-navy to-brand-blue rounded-3xl p-8 md:p-12 text-white">
          <h3 className="font-oswald font-bold text-3xl mb-8">Руководство</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {leadership.map((l, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/10 rounded-2xl p-5">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
                  {l.avatar}
                </div>
                <div>
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-white/60 text-sm mt-1">{l.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}