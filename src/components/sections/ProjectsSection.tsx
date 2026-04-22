import Icon from '@/components/ui/icon';

const projects = [
  {
    id: 1,
    name: 'Госуслуги',
    category: 'Сервисы для граждан',
    status: 'Активен',
    statusColor: 'bg-green-100 text-green-700',
    desc: 'Единый портал государственных и муниципальных услуг. Более 340 сервисов онлайн.',
    metrics: ['12М+ пользователей', '340+ услуг', '97% удовлетворённость'],
    image: 'https://cdn.poehali.dev/projects/929fa1c1-14f1-495f-bccd-a74f836517fe/files/aff48e7e-aceb-4167-b387-c8823c26a116.jpg',
    icon: 'Monitor',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Цифровая экономика',
    category: 'Национальная программа',
    status: 'В разработке',
    statusColor: 'bg-amber-100 text-amber-700',
    desc: 'Нацпрограмма развития цифровой инфраструктуры, данных, технологий и кадров.',
    metrics: ['2,3 трлн ₽ бюджет', 'До 2030 года', '6 федеральных проектов'],
    image: 'https://cdn.poehali.dev/projects/929fa1c1-14f1-495f-bccd-a74f836517fe/files/0c176bb8-af72-4369-8fbb-c91ecd7c897f.jpg',
    icon: 'BarChart3',
    color: 'from-violet-500 to-blue-500',
  },
  {
    id: 3,
    name: 'Суперсервис «Цифровой профиль»',
    category: 'Идентификация',
    status: 'Активен',
    statusColor: 'bg-green-100 text-green-700',
    desc: 'Единая система идентификации граждан для доступа ко всем государственным сервисам.',
    metrics: ['Биометрия', 'ЕСИА', 'Единый вход'],
    image: '',
    icon: 'Fingerprint',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 4,
    name: 'Умный город',
    category: 'Городская среда',
    status: 'Пилот',
    statusColor: 'bg-blue-100 text-blue-700',
    desc: 'Платформа управления городской инфраструктурой: транспорт, ЖКХ, безопасность.',
    metrics: ['30 городов', 'IoT-устройства', 'Предиктивная аналитика'],
    image: '',
    icon: 'Building2',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 5,
    name: 'ГосТех',
    category: 'Платформа разработки',
    status: 'Активен',
    statusColor: 'bg-green-100 text-green-700',
    desc: 'Единая облачная платформа для разработки и размещения государственных информационных систем.',
    metrics: ['150+ команд', 'Открытый код', 'Безопасная среда'],
    image: '',
    icon: 'Code2',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 6,
    name: 'ИИ для государства',
    category: 'Искусственный интеллект',
    status: 'В разработке',
    statusColor: 'bg-amber-100 text-amber-700',
    desc: 'Внедрение решений на основе ИИ в федеральных и региональных органах власти.',
    metrics: ['GPT для госслужбы', 'Автоматизация', 'Predictive analytics'],
    image: '',
    icon: 'Brain',
    color: 'from-rose-500 to-violet-500',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="section-divider w-12" />
          <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Инициативы</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-oswald font-bold text-4xl md:text-5xl text-brand-navy">
            Цифровые проекты<br />и инициативы
          </h2>
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Активен
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> В разработке
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Пилот
            </span>
          </div>
        </div>

        {/* Featured project */}
        <div className="rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-brand-blue/15">
          <div className="relative h-64 bg-gradient-to-br from-brand-navy to-brand-blue">
            <img
              src={projects[0].image}
              alt={projects[0].name}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="text-white max-w-xl">
                <span className={`text-xs px-3 py-1 rounded-full ${projects[0].statusColor} mb-3 inline-block`}>
                  {projects[0].status}
                </span>
                <h3 className="font-oswald font-bold text-4xl mb-3">{projects[0].name}</h3>
                <p className="text-white/80 mb-5">{projects[0].desc}</p>
                <div className="flex flex-wrap gap-3">
                  {projects[0].metrics.map((m, i) => (
                    <span key={i} className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl text-sm border border-white/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(1).map((project) => (
            <div key={project.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm card-hover group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon name={project.icon} fallback="Star" size={22} className="text-white" />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>
              <div className="text-xs text-brand-blue font-medium uppercase tracking-wider mb-2">{project.category}</div>
              <h3 className="font-oswald font-bold text-xl text-brand-navy mb-2">{project.name}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
