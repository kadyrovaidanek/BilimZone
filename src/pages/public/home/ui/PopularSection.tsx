import { Eye, Download, Star, User, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const materials = [
  {
    id: 1, // ✅ ДОБАВИТЬ
    title: "Методы анализа данных в экономике",
    type: "Научная статья",
    author: "Ибраимов А.Ж.",
    date: "2024",
    views: 1234,
    downloads: 567,
    rating: 4.8,
    trending: true,
     
    priceType: "paid",
    price: 500,
    fileUrl: "/mock.pdf" // временно
  },
  {
    id: 2,
    title: "Основы программирования на Java",
    type: "Учебное пособие",
    author: "Керимбаева Н.К.",
    date: "2023",
    views: 3421,
    downloads: 1890,
    rating: 4.9,
    trending: true
  },
  {
    id: 3,
    title: "История кыргызской литературы",
    type: "Учебное пособие",
    author: "Асанов Б.М.",
    date: "2024",
    views: 2156,
    downloads: 943,
    rating: 4.7,
    trending: false
  },
  {
    id: 4,
    title: "Современная педагогика",
    type: "Методичка",
    author: "Исакова А.К.",
    date: "2024",
    views: 876,
    downloads: 432,
    rating: 4.6,
    trending: false
  }
];

// Используем мягкие пастельные цвета вместо ярких градиентов
const typeStyles: Record<string, string> = {
  "Научная статья": "text-blue-600 bg-blue-50",
  "Учебное пособие": "text-emerald-600 bg-emerald-50",
  "Методичка": "text-purple-600 bg-purple-50"
};

export const PopularSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Заголовок — более сдержанный */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Популярные материалы
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Актуальные ресурсы нашего сообщества
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Смотреть все <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Сетка карточек */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {materials.map((material, idx) => (
            <div
              key={idx}
              className="flex flex-col group cursor-pointer"
            >
              {/* Теги — маленькие и неброские */}
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${typeStyles[material.type]}`}>
                  {material.type}
                </span>
                {material.trending && (
                  <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                    Trend
                  </span>
                )}
              </div>

              {/* Заголовок — чистая типографика */}
              <Link to={`/material/${material.id}`}>
                <h3 className="font-semibold hover:text-blue-600">
                  {material.title}
                </h3>
              </Link>

              {/* Информация об авторе */}
              <div className="text-xs text-slate-400 mb-4 flex items-center gap-2">
                <span>{material.author}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>{material.date}</span>
              </div>

              {/* Статистика — компактная и блеклая */}
              <div className="mt-auto flex items-center gap-4 text-[11px] font-medium text-slate-400">
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{material.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>{material.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="text-slate-600">{material.rating}</span>
                </div>
              </div>

              {/* Тонкая линия подчеркивания при наведении вместо тени всей карточки */}
              <div className="w-0 h-0.5 bg-blue-600 mt-4 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Кнопка для мобильных устройств */}
        <button className="md:hidden w-full mt-8 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-lg">
          Все материалы
        </button>
      </div>
    </section>
  );
};