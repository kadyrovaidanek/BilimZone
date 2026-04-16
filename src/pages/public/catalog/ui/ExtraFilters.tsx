export const ExtraFilters = ({
  activeCategory,
  activeExtra,
  setActiveExtra,
}: any) => {
  if (!activeCategory) return null;

  return (
    <div className="mb-6">
      <p className="text-xs text-gray-400 mb-2">
        {activeCategory.extra.label}
      </p>

      <div className="flex gap-2 flex-wrap">
        {activeCategory.extra.values.map((val: any) => (
          <button
            key={val}
            onClick={() => setActiveExtra(val)}
            className={`px-3 py-1 rounded ${
              activeExtra === val
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
};