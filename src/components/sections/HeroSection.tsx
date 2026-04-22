import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const stats = [
  { value: '12М+', label: 'Пользователей Госуслуг' },
  { value: '340+', label: 'Цифровых сервисов' },
  { value: '85%', label: 'Услуг в электронном виде' },
  { value: '2,3 трлн', label: 'Инвестиций в цифровизацию' },
];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/929fa1c1-14f1-495f-bccd-a74f836517fe/files/0c176bb8-af72-4369-8fbb-c91ecd7c897f.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-blue/85 to-brand-cyan/60" />

      {/* Animated geometric shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-brand-cyan/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-brand-blue/15 blur-3xl animate-float delay-400" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/8" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm mb-6 opacity-0-init animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            Министерство цифрового развития России
          </div>

          {/* Headline */}
          <h1 className="font-oswald font-bold text-5xl md:text-7xl text-white leading-tight mb-6 opacity-0-init animate-fade-in-up delay-200">
            Цифровое будущее{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white">
              строится сегодня
            </span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl opacity-0-init animate-fade-in-up delay-300">
            Развиваем цифровую экономику, создаём удобные государственные сервисы и строим технологическую инфраструктуру для всей страны.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 opacity-0-init animate-fade-in-up delay-400">
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-semibold rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-brand-cyan/30 flex items-center gap-2"
            >
              <Icon name="Rocket" size={18} />
              Наши проекты
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              <Icon name="Info" size={18} />
              О министерстве
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-white/8 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center opacity-0-init animate-fade-in-up`}
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className="font-oswald font-bold text-3xl md:text-4xl text-white">{stat.value}</div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-float">
        <span className="text-white text-xs">Прокрутите вниз</span>
        <Icon name="ChevronDown" size={20} className="text-white" />
      </div>
    </section>
  );
}
