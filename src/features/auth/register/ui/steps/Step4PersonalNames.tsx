import { memo } from "react";
import { FormInput } from "@/shared/ui/FormInput";
import { StepWrapper } from "@/shared/ui/StepWrapper";
import type { StepProps } from "../types";

export const Step4PersonalNames = memo(
  ({ data, errors, updateField }: StepProps) => {
    return (
      <StepWrapper
        title="Персональные данные"
        description="Введите ваши личные данные"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* 🔹 Фамилия */}
          <FormInput
            label="Фамилия"
            name="lastName"
            value={data.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            error={errors.lastName}
          />

          {/* 🔹 Имя */}
          <FormInput
            label="Имя"
            name="firstName"
            value={data.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            error={errors.firstName}
          />

          {/* 🔹 Отчество */}
          <FormInput
            label="Отчество"
            name="middleName"
            value={data.middleName || ""}
            onChange={(e) => updateField("middleName", e.target.value)}
            error={errors.middleName}
          />

          {/* 🔹 Телефон */}
          <FormInput
            label="Номер телефона"
            name="phone_number"
            value={data.phone_number || ""}
            onChange={(e) => updateField("phone_number", e.target.value)}
            error={errors.phone_number}
          />

          {/* 🔹 Фото */}
          <div className="md:col-span-2">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Фото
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) =>
                updateField("photo", e.target.files?.[0] || null)
              }
              className="
                w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 
                hover:file:bg-blue-100
              "
            />
          </div>

        </div>
      </StepWrapper>
    );
  }
);