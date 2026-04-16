import { useState } from "react";

const categories = [
  {
    id: "school",
    name: "Школьные",
    items: ["Кыргызский язык", "Русский язык", "Английский язык", "Математика", "Физика", "Химия", "История", "География", "Биология", "Литература", "Информатика", "Геометрия"],
    extra: { label: "выберите класс:", values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  },
  {
    id: "tests",
    name: "Подготовка к тестам",
    items: ["ОРТ (ЖРТ)", "IELTS", "TOEFL", "НЦТ", "ЕГЭ", "ОГЭ", "SAT", "GRE"],
    extra: { label: "формат материала:", values: ["Тесты", "Разборы", "Гайды", "Шпаргалки"] },
  },
  {
    id: "university",
    name: "Вузовские",
    items: ["Экономика", "Юриспруденция", "Медицина", "Психология", "Архитектура", "IT технологии", "Философия"],
    extra: { label: "курс обучения:", values: [1, 2, 3, 4, 5, "Магистр"] },
  },
    {
    id: "diplomas",
    name: "Курсовые и Дипломы",
    items: [
      "Дипломные работы", 
      "Курсовые работы", 
      "Магистерские диссертации", 
      "Отчеты по практике", 
      "Рефераты", 
      "ВКР",
      "Чертежи и проекты"
    ],
    extra: { label: "статус работы:", values: ["С защитой", "Шаблон", "Черновик", "Готовая"] },
  },
  {
    id: "science",
    name: "Научные",
    items: [
      "Научные статьи", 
      "Авторефераты", 
      "Монографии", 
      "Тезисы конференций", 
      "Исследования", 
      "Статьи ВАК / Scopus"
    ],
    extra: { label: "база данных:", values: ["РИНЦ", "ВАК", "Scopus", "Web of Science"] },
  },
  {
    id: "orgs",
    name: "Архив организаций",
    items: [
      "Вестники ВУЗов", 
      "Методические пособия", 
      "Учебные планы", 
      "Корпоративные кейсы", 
      "Уставы и регламенты"
    ],
    extra: { label: "тип учреждения:", values: ["ВУЗ", "Школа", "Колледж", "НИИ"] },
  },
  {
    id: "business",
    name: "Бизнес",
    items: ["Менеджмент", "Маркетинг", "Финансы", "Продажи", "HR", "Логистика"],
    extra: { label: "уровень:", values: ["Beginner", "Middle", "Senior", "Expert"] },
  },
  {
    id: "fiction",
    name: "Художественные",
    items: ["Классика", "Фантастика", "Детективы", "Исторические", "Поэзия", "Драматургия"],
    extra: { label: "язык издания:", values: ["Кыргызча", "Русский", "English"] },
  },

  {
    id: "self",
    name: "Саморазвитие",
    items: ["Психология", "Дизайн", "Кулинария", "Фотография", "Тайм-менеджмент"],
    extra: { label: "тип контента:", values: ["Книга", "Курс", "Гайд", "Чек-лист"] },
  },
  
];

export const AdvancedCatalog = () => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    // Уменьшили общую ширину с 900px до 720px
    <div className="flex w-[620px] h-[440px] bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden">
      
      {/* ЛЕВАЯ ЧАСТЬ — КАТЕГОРИИ */}
      <div className="w-[240px] bg-slate-50/80 border-r border-slate-100 p-4 flex flex-col gap-0.5">
        <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 px-3 italic">Каталог BilimZone</h3>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onMouseEnter={() => setActiveTab(cat)}
            className={`w-full flex justify-between items-center px-3 py-2.5 rounded-xl transition-all duration-200 ${
              activeTab.id === cat.id
                ? "bg-white shadow-sm text-blue-600 ring-1 ring-slate-100"
                : "hover:bg-slate-200/40 text-slate-500"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-semibold">{cat.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ПРАВАЯ ЧАСТЬ — КОНТЕНТ */}
      <div className="flex-1 p-7 flex flex-col bg-white overflow-hidden">
        
        {/* Направления */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-5">Направления</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {activeTab.items.map((item, i) => (
              <div 
                key={i} 
                className="text-[13px] font-medium text-slate-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ВЫБОР КЛАССА / КУРСА — Сетка 4 колонки */}
        <div className="mt-auto pt-5 border-t border-slate-50">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">
            {activeTab.extra.label}
          </p>

          <div className="grid grid-cols-4 gap-2">
            {activeTab.extra.values.map((v, i) => (
              <button
                key={i}
                className="py-1.5 border border-slate-100 rounded-lg text-[12px] font-bold text-slate-500 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 transition-all"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};