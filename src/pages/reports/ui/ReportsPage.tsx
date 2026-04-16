import { useState } from "react";
import { usePublications } from "@/entities/publication/model/usePublications";

export const ReportsPage = () => {
  const { publications } = usePublications();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const exportExcel = () => {
    const data = JSON.stringify(publications, null, 2);
    const blob = new Blob([data], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.json";
    a.click();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Отчеты</h1>

      {/* 📊 популярные */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">
          Самые популярные материалы
        </h2>

        {publications.map((p) => (
          <div key={p.id} className="text-sm py-1">
            {p.title}
          </div>
        ))}
      </div>

      {/* 📅 фильтр */}
      <div className="bg-white p-5 rounded-xl shadow space-y-3">
        <h2 className="font-semibold">Финансовые отчеты</h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={exportExcel}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Скачать отчет
        </button>
      </div>

    </div>
  );
};