import { useState } from "react";

export const AdminAgreementsPage = () => {
  const [agreements, setAgreements] = useState([
    { id: 1, title: "Пользовательское соглашение" }
  ]);

  const [newTitle, setNewTitle] = useState("");

  const addAgreement = () => {
    if (!newTitle.trim()) return;

    setAgreements(prev => [
      ...prev,
      { id: Date.now(), title: newTitle }
    ]);

    setNewTitle("");
  };

  const removeAgreement = (id: number) => {
    setAgreements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Соглашения</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Название соглашения"
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={addAgreement}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Добавить
        </button>
      </div>

      <ul className="space-y-2">
        {agreements.map(a => (
          <li
            key={a.id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{a.title}</span>

            <button
              onClick={() => removeAgreement(a.id)}
              className="text-red-500"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};