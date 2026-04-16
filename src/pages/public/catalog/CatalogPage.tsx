import { useState, useMemo } from "react";
import { categories } from "./model/categories";
import { books } from "./model/items";

import { CategorySidebar } from "./ui/CategorySidebar";
import { ExtraFilters } from "./ui/ExtraFilters";
import { BooksGrid } from "./ui/BooksGrid";
import image from "@/assets/images/glavn1.png";

export const CatalogPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState("school");
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeExtra, setActiveExtra] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = categories.find(
    (c) => c.id === activeCategoryId
  );

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      return (
        book.category === activeCategoryId &&
        (!activeSubject || book.subject === activeSubject) &&
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeCategoryId, activeSubject, searchQuery]);

  return (
    <div className="min-h-screen bg-white">

      {/* 🔥 HERO СВЕРХУ */}
      <section className="px-8 py-8" style={{ backgroundColor: "#C5E5FE" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-10">

          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-slate-800">
              Платформа учебных материалов
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Поиск, публикация и покупка ресурсов
            </p>

            <div className="mt-6 relative max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию..."
                className="w-full p-4 pr-12 rounded bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src={image}
              alt="hero"
              className="w-[350px]"
            />
          </div>

        </div>
      </section>

      {/* 🔥 ОСНОВНОЙ КОНТЕНТ */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-10">

        {/* Sidebar */}
        <CategorySidebar
          categories={categories}
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
          setActiveSubject={setActiveSubject}
        />

        {/* Content */}
        <div className="flex-1">

          <ExtraFilters
            activeCategory={activeCategory}
            activeExtra={activeExtra}
            setActiveExtra={setActiveExtra}
          />

          <BooksGrid books={filteredBooks} />

        </div>

      </div>
    </div>
  );
};