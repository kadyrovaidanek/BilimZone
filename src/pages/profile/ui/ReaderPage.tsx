import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const ReaderPage = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [form, setForm] = useState({
    photo: null as File | null,
    email: "aidanekkadyrova1@gmail.com", // 🔥 потом из store
    login: "aidana",
    phone_number: "+996700000000",
    firstName: "Айданек",
    lastName: "Кадырова",
    middleName: "",
    oldPassword: "",
    newPassword: "",
  });

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* 🔷 ФОТО */}
      <div className="bg-white rounded-3xl shadow p-6 text-center">
        <div className="h-32 rounded-2xl bg-gradient-to-r from-purple-300 to-purple-500 flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
            A
          </div>
        </div>

        <button className="border-2 border-orange-500 text-orange-600 px-6 py-2 rounded-xl font-medium hover:bg-orange-50 transition">
          Сменить фото
        </button>

        <p className="text-sm text-gray-500 mt-2">
          Картинка в форматах png и jpg
        </p>
      </div>

      {/* 🔷 EMAIL */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h3 className="text-xl font-bold mb-2">Электронная почта</h3>
        <p className="text-gray-600 mb-4">{form.email}</p>
      </div>

      {/* 🔷 ДАННЫЕ */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Ваши данные</h3>

        <div className="space-y-4">
          <input
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Имя"
            className="input"
          />

          <input
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Фамилия"
            className="input"
          />

          <input
            value={form.middleName}
            onChange={(e) => update("middleName", e.target.value)}
            placeholder="Отчество"
            className="input"
          />

          <input
            value={form.phone_number}
            onChange={(e) => update("phone_number", e.target.value)}
            placeholder="Телефон"
            className="input"
          />

          <input
            value={form.login}
            onChange={(e) => update("login", e.target.value)}
            placeholder="Логин"
            className="input"
          />
        </div>

        <button className="mt-5 w-full border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition">
          Сохранить
        </button>
      </div>

      {/* 🔷 ПАРОЛЬ */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Изменить пароль</h3>

        <div className="space-y-4">

          {/* старый */}
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Старый пароль"
              className="input pr-10"
              onChange={(e) => update("oldPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* новый */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Новый пароль"
              className="input pr-10"
              onChange={(e) => update("newPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button className="mt-5 w-full border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition">
          Изменить
        </button>
      </div>
    </div>
  );
};