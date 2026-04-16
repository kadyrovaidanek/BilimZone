import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Globe,
  Award
} from "lucide-react";

const benefits = [
  {
    title: "Обширная библиотека",
    description: "Доступ к тысячам учебных материалов: от школьных конспектов до сложных научных диссертаций.",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Сообщество экспертов",
    description: "Материалы проходят проверку и оценку реальными пользователями и преподавателями.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Безопасность сделок",
    description: "Гарантированная защита ваших платежей и авторских прав при покупке или продаже ресурсов.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    title: "Мгновенный доступ",
    description: "Скачивайте нужные файлы сразу после оплаты или находите бесплатные ресурсы в один клик.",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export const EducationSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок секции */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Преимущества</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Ваш путь к <br /> 
              <span className="text-slate-400">эффективному обучению</span>
            </h2>
          </div>
          <p className="text-lg text-slate-500 max-w-md pb-2">
            Мы создали экосистему, где знания становятся доступными, а процесс обмена опытом — безопасным и простым.
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className={`w-14 h-14 ${item.bgColor} ${item.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                <item.icon size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-transparent group-hover:border-slate-200 pl-0 group-hover:pl-4 transition-all duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

    

        {/* Маленькие цифры статистики (опционально) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-100">
          {[
            { label: "Пользователей", val: "50k+", icon: Globe },
            { label: "Материалов", val: "120k+", icon: BookOpen },
            { label: "Оценок 5.0", val: "15k+", icon: Award },
            { label: "Скачиваний", val: "1M+", icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-2xl font-black text-slate-900">{stat.val}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};