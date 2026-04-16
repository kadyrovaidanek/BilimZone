import image from "@/assets/images/glavn1.png";
import { CategoriesSection } from "./CategoriesSection";
import { EducationSection } from "./EducationSection";
import { PopularSection } from "./PopularSection";

export const HomePage = () => {
  return (
    <div>

      {/* 🔹 HERO */}
      <section className="px-8 py-8" style={{ backgroundColor: "#C5E5FE" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-10">

          {/* 🔹 ТЕКСТ */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-slate-800">
              Платформа учебных материалов
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Поиск, публикация и покупка ресурсов
            </p>

            {/* 🔍 ПОИСК */}
            <div className="mt-6 relative max-w-lg">
              <input
                type="text"
                placeholder="Поиск по названию..."
                className="
                  w-full 
                  p-4 pr-12 
                  rounded 
                  bg-white 
                  border border-gray-300 
                  shadow-sm
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-400
                "
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* 🔹 КАРТИНКА */}
          <div className="hidden md:block">
            <img
              src={image}
              alt="hero"
              className="w-[350px] object-contain"
            />
          </div>

        </div>
      </section>

      {/* 🔥 КАТЕГОРИИ */}
      <PopularSection />
<CategoriesSection />
<EducationSection />

    </div>
  );
};