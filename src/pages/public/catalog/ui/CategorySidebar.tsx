export const CategorySidebar = ({
  categories,
  activeCategoryId,
  setActiveCategoryId,
  setActiveSubject,
}: any) => {

  const activeCategory = categories.find(
    (c: any) => c.id === activeCategoryId
  );

  return (
    <aside className="w-64">

      {/* Категории */}
      <h3 className="text-xs text-gray-400 mb-4 uppercase">Категории</h3>

      {categories.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() => {
            setActiveCategoryId(cat.id);
            setActiveSubject(null);
          }}
          className={`w-full text-left px-3 py-2 rounded ${
            activeCategoryId === cat.id
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {cat.name}
        </button>
      ))}

      {/* 🔥 НАПРАВЛЕНИЯ */}
      <div className="mt-8">
        <h3 className="text-xs text-gray-400 mb-3 uppercase">
          Направления
        </h3>

        <div className="space-y-1">
          {activeCategory?.items.map((item: string) => (
            <button
              key={item}
              onClick={() => setActiveSubject(item)}
              className="block w-full text-left px-3 py-1 text-sm text-gray-500 hover:text-blue-600"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};