import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/entities/user/model/useAuth";
import logo from "@/assets/images/logo.svg";
import { useState } from "react";
import { AdvancedCatalog } from "../catalog/AdvancedCatalog";

export const Header = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  // ✅ состояния здесь
  const [openCatalog, setOpenCatalog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const changeLanguage = (lang: "ru" | "kg") => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* 🔹 ЛОГО */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Bilimzone" className="w-12 h-12" />
        </Link>

        {/* 🔹 МЕНЮ */}
        <nav className="flex items-center gap-10 text-slate-700 font-medium">

          {/* 🔹 ГЛАВНАЯ */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold" : "hover:text-blue-900"
            }
          >
            {t("home")}
          </NavLink>

          {/* 🔥 КАТАЛОГ С DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setOpenCatalog(true)}
            onMouseLeave={() => {
              setOpenCatalog(false);
              setActiveCategory(null);
            }}
          >
            <Link
              to="/catalog"
              className="cursor-pointer hover:text-blue-900"
            >
              {t("header.catalog")}
            </Link>

            {openCatalog && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <AdvancedCatalog />
              </div>
            )}
          </div>

          {/* 🔹 О ПРОЕКТЕ */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold" : "hover:text-blue-900"
            }
          >
            {t("about")}
          </NavLink>

        </nav>

        {/* 🔹 ПРАВАЯ ЧАСТЬ */}
        <div className="flex items-center gap-6">

          {/* 🌍 ЯЗЫК */}
          <div className="flex gap-2 text-sm border rounded-lg px-2 py-1">
            <button
              onClick={() => changeLanguage("ru")}
              className={`px-2 py-1 rounded ${i18n.language === "ru"
                  ? "bg-slate-200 font-semibold"
                  : "hover:bg-slate-100"
                }`}
            >
              RU
            </button>

            <button
              onClick={() => changeLanguage("kg")}
              className={`px-2 py-1 rounded ${i18n.language === "kg"
                  ? "bg-slate-200 font-semibold"
                  : "hover:bg-slate-100"
                }`}
            >
              KG
            </button>
          </div>

          {/* 🔐 AUTH */}
          {user ? (
            <button
              onClick={logout}
              className="text-red-500 font-medium hover:underline"
            >
              {t("auth.logout")}
            </button>
          ) : (
            <Link
              to="/login"
              className="text-orange-500 font-medium hover:underline"
            >
              {t("login")}
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};