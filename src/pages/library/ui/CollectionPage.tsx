import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CollectionPage = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("collection") || "[]");
    setItems(data);
  }, []);

  const handleRemove = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    localStorage.setItem("collection", JSON.stringify(updated));
    setItems(updated);
  };

  if (items.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400">
        У вас пока нет материалов 😔
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Моя коллекция</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <Link
              to={`/material/${item.id}`}
              state={{ material: item }}
            >
              <img
                src={item.image}
                className="rounded mb-3 h-[200px] w-full object-cover"
              />

              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {item.author}
              </p>
            </Link>

            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 text-sm"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};