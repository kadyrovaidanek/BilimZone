import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Sparkles, BookOpen, 
  FileText, GraduationCap, Library, PenTool, Microscope 
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Школьные учебники", material_count: 245, style: { icon: GraduationCap, gradient: "from-emerald-500 to-teal-600" } },
  { id: 2, name: "Курсовые работы", material_count: 189, style: { icon: FileText, gradient: "from-orange-500 to-red-600" } },
  { id: 3, name: "Дипломные работы", material_count: 97, style: { icon: Library, gradient: "from-purple-500 to-pink-600" } },
  { id: 4, name: "Научные статьи", material_count: 432, style: { icon: Microscope, gradient: "from-blue-500 to-cyan-600" } },
  { id: 5, name: "Методические пособия", material_count: 156, style: { icon: BookOpen, gradient: "from-indigo-500 to-purple-600" } },
  { id: 6, name: "Лекции и конспекты", material_count: 567, style: { icon: PenTool, gradient: "from-rose-500 to-orange-600" } }
];

export const CategoriesSection = () => {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % categories.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  }, []);

  // Только автопрокрутка без кнопок паузы
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* 🌌 Фоновый светящийся поток (тот самый пролет) */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-0 w-[600px] h-[300px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Направления</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Выберите свою <span className="text-blue-600">категорию</span>
          </h2>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          {/* Кнопки навигации — сделали их минималистичными */}
          <button onClick={prev} className="absolute left-4 md:left-10 z-30 p-3 rounded-full bg-white/50 backdrop-blur-md hover:bg-white shadow-sm transition-all text-slate-400 hover:text-blue-600">
            <ChevronLeft size={28} />
          </button>
          <button onClick={next} className="absolute right-4 md:right-10 z-30 p-3 rounded-full bg-white/50 backdrop-blur-md hover:bg-white shadow-sm transition-all text-slate-400 hover:text-blue-600">
            <ChevronRight size={28} />
          </button>

          <div className="relative w-full flex justify-center items-center">
            <AnimatePresence mode="popLayout">
              {categories.map((cat, i) => {
                const isActive = i === index;
                const isLeft = i === (index - 1 + categories.length) % categories.length;
                const isRight = i === (index + 1) % categories.length;

                if (!isActive && !isLeft && !isRight) return null;

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.8, x: isLeft ? -100 : 100 }}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1.1 : 0.85,
                      x: isActive ? 0 : isLeft ? -300 : 300,
                      zIndex: isActive ? 20 : 10,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 150, // Плавность хода
                      damping: 25     // Мягкость остановки
                    }}
                    className="absolute"
                  >
                    <Link to={`/materials?category=${cat.id}`} className="block group">
                      <div className={`
                        w-[280px] md:w-[310px] rounded-[40px] overflow-hidden transition-all duration-700
                        ${isActive ? "shadow-[0_40px_80px_-15px_rgba(59,130,246,0.25)]" : "shadow-none"}
                      `}>
                        <div className={`h-44 flex items-center justify-center bg-gradient-to-br ${cat.style.gradient} relative`}>
                          {/* Эффект "загорания" в центре */}
                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-white/20 blur-2xl"
                            />
                          )}
                          <cat.style.icon className="w-20 h-20 text-white drop-shadow-xl" />
                        </div>
                        <div className="bg-white p-8 text-center">
                          <h3 className="text-xl font-bold text-slate-800">{cat.name}</h3>
                          <p className="text-slate-400 text-sm mt-2 font-medium uppercase tracking-wider">
                            {cat.material_count} файлов
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Простой индикатор (точки) без прогресс-бара */}
        <div className="flex justify-center gap-3 mt-10">
          {categories.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-blue-600" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};