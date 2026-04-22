export interface ShopItem {
  id: string;
  name: string;
  category: 'signature' | 'consulting' | 'software' | 'education' | 'security';
  price: number;
  unit: string;
  desc: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  icon: string;
  popular?: boolean;
}

export const shopItems: ShopItem[] = [
  // Электронная подпись
  {
    id: 'ep-basic',
    name: 'Электронная подпись — Базовая',
    category: 'signature',
    price: 1900,
    unit: 'год',
    desc: 'Квалифицированная электронная подпись для физических лиц. Подходит для Госуслуг и налоговой.',
    features: ['Доступ к Госуслугам', 'Налоговая декларация', 'Удалённая выдача', 'Техподдержка 5×8'],
    icon: 'PenTool',
    badge: 'Хит',
    badgeColor: 'bg-green-100 text-green-700',
    popular: true,
  },
  {
    id: 'ep-business',
    name: 'Электронная подпись — Бизнес',
    category: 'signature',
    price: 4500,
    unit: 'год',
    desc: 'КЭП для ИП и ООО. Включает регистрацию в ФНС, торги и государственные контракты.',
    features: ['ФНС и ФСС', 'Госзакупки 44-ФЗ', 'Торговые площадки', 'Техподдержка 24/7'],
    icon: 'PenTool',
    badge: 'Для бизнеса',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'ep-pro',
    name: 'Электронная подпись — Pro',
    category: 'signature',
    price: 8900,
    unit: 'год',
    desc: 'КЭП для корпораций и госорганов. Неограниченное число документов, приоритетная поддержка.',
    features: ['Любые госпорталы', 'Корпоративный токен', 'Несколько сертификатов', 'Персональный менеджер'],
    icon: 'PenTool',
  },

  // Консультации
  {
    id: 'consult-start',
    name: 'Консультация по цифровизации',
    category: 'consulting',
    price: 12000,
    unit: 'сессия',
    desc: '2-часовая онлайн-сессия с экспертом Минцифры по цифровой трансформации вашего бизнеса.',
    features: ['2 часа с экспертом', 'Анализ текущего ИТ', 'Дорожная карта', 'Запись сессии'],
    icon: 'MessageSquare',
    badge: 'Онлайн',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'consult-audit',
    name: 'Аудит цифровой зрелости',
    category: 'consulting',
    price: 45000,
    unit: 'проект',
    desc: 'Комплексный аудит цифровой инфраструктуры предприятия с выдачей официального заключения.',
    features: ['Команда из 3 экспертов', 'До 5 рабочих дней', 'Официальный отчёт', 'Рекомендации'],
    icon: 'ClipboardList',
    popular: true,
  },
  {
    id: 'consult-strategy',
    name: 'Стратегия цифровой трансформации',
    category: 'consulting',
    price: 180000,
    unit: 'проект',
    desc: 'Разработка полноценной стратегии цифровизации на 3 года с дорожной картой реализации.',
    features: ['Глубокий анализ', 'Стратегия 3 года', 'Дорожная карта', 'Сопровождение 3 мес.'],
    icon: 'Target',
    badge: 'Топ',
    badgeColor: 'bg-amber-100 text-amber-700',
  },

  // Лицензии на ПО
  {
    id: 'soft-office',
    name: 'МойОфис Стандартный',
    category: 'software',
    price: 3600,
    unit: 'год / раб. место',
    desc: 'Российский офисный пакет: текстовый редактор, таблицы, презентации. Реестр Минцифры.',
    features: ['Текст, таблицы, слайды', 'Облачное хранилище', 'Совместная работа', 'Обновления включены'],
    icon: 'FileText',
    badge: 'Отечественный',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'soft-ged',
    name: 'Система электронного документооборота',
    category: 'software',
    price: 28000,
    unit: 'год / организация',
    desc: 'СЭД для государственных и коммерческих организаций. Интеграция с Госуслугами.',
    features: ['До 50 пользователей', 'Интеграция с ЕСИА', 'Архив документов', 'ЭЦП внутри системы'],
    icon: 'FolderOpen',
    popular: true,
  },
  {
    id: 'soft-erp',
    name: 'Цифровой муниципалитет',
    category: 'software',
    price: 95000,
    unit: 'год',
    desc: 'Платформа цифрового управления для муниципальных образований. Полный функционал.',
    features: ['Бюджет и финансы', 'Управление услугами', 'Аналитика и BI', 'Мобильное приложение'],
    icon: 'Building2',
  },

  // Обучение и сертификация
  {
    id: 'edu-digital',
    name: 'Курс «Цифровая грамотность»',
    category: 'education',
    price: 4900,
    unit: 'чел.',
    desc: 'Онлайн-курс повышения цифровой грамотности для сотрудников организаций. 24 часа.',
    features: ['24 часа онлайн', 'Тест и сертификат', 'Доступ на 1 год', 'Группа поддержки'],
    icon: 'GraduationCap',
    badge: 'Онлайн',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'edu-cybersec',
    name: 'Сертификация по кибербезопасности',
    category: 'education',
    price: 18500,
    unit: 'чел.',
    desc: 'Профессиональный курс по информационной безопасности с государственным сертификатом.',
    features: ['80 часов', 'Практические задания', 'Гос. сертификат', 'Очно или онлайн'],
    icon: 'Award',
    popular: true,
    badge: 'Гос. сертификат',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'edu-corp',
    name: 'Корпоративное обучение ИТ',
    category: 'education',
    price: 120000,
    unit: 'группа до 20 чел.',
    desc: 'Выездное или очное корпоративное обучение по ИТ-компетенциям под ключ.',
    features: ['Программа под заказ', 'До 20 человек', '5 дней обучения', 'Сертификаты всем'],
    icon: 'Users',
  },

  // Оборудование ИБ
  {
    id: 'sec-firewall',
    name: 'Аппаратный межсетевой экран ViPNet',
    category: 'security',
    price: 89000,
    unit: 'устройство',
    desc: 'Сертифицированный ФСТЭК межсетевой экран для защиты корпоративных сетей. Российское ПО.',
    features: ['Сертификат ФСТЭК', 'Пропускная 1 Гбит/с', 'VPN-туннели', 'Центральное управление'],
    icon: 'Shield',
    badge: 'ФСТЭК',
    badgeColor: 'bg-red-100 text-red-700',
    popular: true,
  },
  {
    id: 'sec-hsm',
    name: 'Аппаратный модуль безопасности (HSM)',
    category: 'security',
    price: 245000,
    unit: 'устройство',
    desc: 'HSM для хранения ключей шифрования и генерации криптографических операций. ГОСТ Р.',
    features: ['ГОСТ Р 34.10-2012', 'Физическая защита', 'Удалённое управление', 'Журнал аудита'],
    icon: 'Lock',
  },
  {
    id: 'sec-token',
    name: 'Смарт-карты и токены (комплект 10 шт.)',
    category: 'security',
    price: 12500,
    unit: 'комплект',
    desc: 'Сертифицированные USB-токены Рутокен ЭЦП 3.0 для хранения ключей подписи.',
    features: ['Рутокен ЭЦП 3.0', 'ГОСТ-криптография', '10 устройств', 'Драйвера в комплекте'],
    icon: 'Usb',
    badge: 'Хит',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'sec-dlp',
    name: 'DLP-система «СёрчИнформ»',
    category: 'security',
    price: 67000,
    unit: 'год / 25 раб. мест',
    desc: 'Система предотвращения утечек данных. Мониторинг каналов коммуникации сотрудников.',
    features: ['25 рабочих мест', 'Email, мессенджеры', 'Теневое копирование', 'Аналитика инцидентов'],
    icon: 'Eye',
  },
  {
    id: 'sec-siem',
    name: 'SIEM-система MaxPatrol',
    category: 'security',
    price: 390000,
    unit: 'год / лицензия',
    desc: 'Система мониторинга и управления событиями ИБ. Обнаружение угроз в реальном времени.',
    features: ['Real-time мониторинг', 'Корреляция событий', 'Отчёты для регуляторов', 'Интеграция с SOC'],
    icon: 'Activity',
    badge: 'Топ',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
];

export const categoryLabels: Record<ShopItem['category'], string> = {
  signature: 'Электронная подпись',
  consulting: 'Консультации',
  software: 'Лицензии на ПО',
  education: 'Обучение и сертификация',
  security: 'Оборудование для ИБ',
};

export const categoryIcons: Record<ShopItem['category'], string> = {
  signature: 'PenTool',
  consulting: 'MessageSquare',
  software: 'Package',
  education: 'GraduationCap',
  security: 'ShieldCheck',
};
