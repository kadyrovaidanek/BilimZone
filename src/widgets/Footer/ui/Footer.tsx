import logo from "@/assets/images/logo.svg";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#E9EEF5] border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">

        {/* 🔹 ЛЕВАЯ ЧАСТЬ */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-10 h-10" />
            <span className="font-semibold text-slate-700">
              Bilimzone
            </span>
          </div>

          <p className="text-sm text-slate-500">
            {t("footer.text")}
          </p>
        </div>

        {/* 🔹 СРЕДНЯЯ ЧАСТЬ */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            {t("footer.about")}
          </h4>

          <ul className="space-y-1 text-sm text-slate-600">
            <li>{t("footer.history")}</li>
            <li>{t("footer.funds")}</li>
            <li>{t("footer.projects")}</li>
            <li>{t("footer.partners")}</li>
            <li>{t("footer.docs")}</li>
          </ul>
        </div>

        {/* 🔹 ПРАВАЯ ЧАСТЬ */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            {t("footer.support")}
          </h4>

          <ul className="space-y-1 text-sm text-slate-600">
            <li>{t("footer.contacts")}</li>
            <li>{t("footer.faq")}</li>
          </ul>
        </div>

      </div>

      {/* 🔹 НИЗ */}
      <div className="text-center text-sm text-slate-500 pb-4">
        © 2026 Bilimzone
      </div>
    </footer>
  );
};