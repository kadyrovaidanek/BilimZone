import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/features/auth/login/model/useLogin";

export const LoginFields = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* 🔹 LOGIN */}
      <Input
        id="login"
        label={t("auth.login")}
        type="text"
        placeholder={t("auth.loginPlaceholder")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        icon={<FaEnvelope className="text-gray-400" />}
      />

      {/* 🔹 PASSWORD */}
      <div className="relative">
        <Input
          id="password"
          label={t("auth.password")}
          type={showPassword ? "text" : "password"}
          placeholder={t("auth.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          icon={<FaLock className="text-gray-400" />}
        />

        {/* 👁 SHOW PASSWORD */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute right-3 top-[38px] 
            text-gray-400 
            hover:text-blue-500 
            transition
          "
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* ❌ ERROR */}
      {error && (
        <div
          className="
            text-red-600 
            bg-red-50 
            border border-red-200 
            p-3 
            rounded-lg 
            text-sm 
            text-center
          "
        >
          {error}
        </div>
      )}

      {/* 🔹 BUTTON */}
      <Button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-[#4DA6F]
          text-white
          py-3
          rounded-lg
          font-semibold
          hover:bg-[#3399FF]
          active:scale-[0.98]
          transition
          shadow-sm
        "
      >
        {loading ? t("auth.loading") : t("auth.submit")}
      </Button>

    </form>
  );
};