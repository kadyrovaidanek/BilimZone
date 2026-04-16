import { useState } from "react";
import { Eye, EyeOff, Globe, MapPin, Building2 } from "lucide-react";

export const OrganizationPage = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [form, setForm] = useState({
    photo: null as File | null,

    // 🔹 USERS
    email: "org@mail.com",
    login: "knu_official",
    phone_number: "+996312000000",

    // 🔹 контактное лицо
    firstName: "Айданек",
    lastName: "Кадырова",
    middleName: "",

    // 🔹 ORGANIZATION
    organization_name: "КНУ",
    legal_name: "Кыргызский Национальный Университет имени Ж. Баласагына",
    bio: "Ведущий университет Кыргызстана, предоставляющий образовательные материалы.",
    address: "г. Бишкек, ул. Фрунзе 547",
    website: "https://knu.kg",

    // 🔹 пароль
    oldPassword: "",
    newPassword: "",
  });

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* 🔷 ФОТО / ЛОГО */}
      <div className="bg-white rounded-3xl shadow p-6 text-center">

        <div className="h-32 rounded-2xl bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-indigo-700 text-white flex items-center justify-center text-3xl font-bold">
            K
          </div>
        </div>

        <button className="border-2 border-orange-500 text-orange-600 px-6 py-2 rounded-xl font-medium hover:bg-orange-50 transition">
          Сменить логотип
        </button>

        <p className="text-sm text-gray-500 mt-2">
          PNG / JPG
        </p>

        {/* 🔥 тип аккаунта */}
        <div className="flex justify-center mt-5">
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl text-sm font-medium">
            <Building2 size={16} />
            Организация
          </div>
        </div>

      </div>

      {/* 🔷 EMAIL */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h3 className="text-xl font-bold mb-2">Электронная почта</h3>
        <p className="text-gray-600 mb-4">{form.email}</p>

        <button className="border-2 border-orange-500 text-orange-600 px-6 py-2 rounded-xl font-medium hover:bg-orange-50 transition">
          Изменить
        </button>
      </div>

      {/* 🔷 ДАННЫЕ */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Данные организации</h3>

        <div className="space-y-4">

          <input
            value={form.organization_name}
            onChange={(e) => update("organization_name", e.target.value)}
            placeholder="Короткое название"
            className="input"
          />

          <input
            value={form.legal_name}
            onChange={(e) => update("legal_name", e.target.value)}
            placeholder="Полное название"
            className="input"
          />

          <textarea
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            placeholder="Описание организации"
            className="input min-h-[100px]"
          />

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Адрес"
              className="input pl-10"
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="Сайт"
              className="input pl-10"
            />
          </div>

        </div>

        <button className="mt-5 w-full border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition">
          Сохранить
        </button>
      </div>

      {/* 🔷 КОНТАКТНОЕ ЛИЦО */}
      <div className="bg-white rounded-3xl shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Контактное лицо</h3>

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