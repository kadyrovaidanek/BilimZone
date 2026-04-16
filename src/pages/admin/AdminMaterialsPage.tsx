import { useState } from "react";

type MaterialStatus = "pending" | "approved" | "rejected";

interface Material {
  id: number;
  title: string;
  status: MaterialStatus;
}

export const AdminMaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, title: "Математика 5 класс", status: "pending" },
    { id: 2, title: "Физика 9 класс", status: "pending" }
  ]);

  const approve = (id: number) => {
    setMaterials(prev =>
      prev.map(m =>
        m.id === id ? { ...m, status: "approved" } : m
      )
    );
  };

  const reject = (id: number) => {
    setMaterials(prev =>
      prev.map(m =>
        m.id === id ? { ...m, status: "rejected" } : m
      )
    );
  };

  const getStatusLabel = (status: MaterialStatus) => {
    switch (status) {
      case "approved":
        return "Одобрено";
      case "rejected":
        return "Отклонено";
      default:
        return "На проверке";
    }
  };

  const getStatusStyle = (status: MaterialStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Модерация материалов
      </h1>

      <div className="space-y-4">
        {materials.map(m => (
          <div
            key={m.id}
            className="border p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{m.title}</p>

              <span
                className={`text-xs px-2 py-1 rounded mt-2 inline-block ${getStatusStyle(
                  m.status
                )}`}
              >
                {getStatusLabel(m.status)}
              </span>
            </div>

            {m.status === "pending" && (
              <div className="space-x-2">
                <button
                  onClick={() => approve(m.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Одобрить
                </button>

                <button
                  onClick={() => reject(m.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Отклонить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};