import React, { useState, useCallback, useMemo } from 'react';
import { RegisterForm } from '@/widgets/RegisterForm/ui/RegisterForm';
import { INITIAL_REGISTRATION_DATA } from '@/entities/user/model/constants';
import type { UserRegistrationData } from '@/entities/user/model/types';
import { useUserStore } from '@/entities/user/model/user-store';
import { useRegister } from '../model/useRegister';

import {
  baseSteps,
  readerStep,
  authorStep,
  organizationStep,
  contractStep,
} from '../model/steps';

import { Step1Credentials } from './steps/Step1Credentials';
import { Step2PersonalInfo } from './steps/Step2PersonalInfo';
import { Step3Verification } from './steps/Step3Verification';
import { Step5UserType } from './steps/Step5UserType';
import { Step6Details } from './steps/Step6Details';
import { Step7Contract } from './steps/Step7Contract';

const getInitialState = () => ({
  data: INITIAL_REGISTRATION_DATA,
  currentStep: 0,
  confirmPassword: '',
});

export const RegisterProcess = () => {
  const [initialState] = useState(getInitialState);

  const [data, setData] = useState<UserRegistrationData>(initialState.data);
  const [confirmPassword, setConfirmPassword] = useState(initialState.confirmPassword);
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserRegistrationData | 'confirmPassword', string>>
  >({});

  const { isAuthenticated, isLoading } = useUserStore();
  const { completeRegistration } = useRegister();

  // 🔹 обновление полей
  const updateField = useCallback(
    <K extends keyof UserRegistrationData>(field: K, value: UserRegistrationData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // 🔙 назад
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // 📁 загрузка фото
  const handleFileChange =
    (field: 'photo') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      updateField(field, file);
    };

  // 🔥 ШАГИ
  const steps = useMemo(() => {
    if (data.userType === 'reader') {
      return [...baseSteps, readerStep]; // ❗ без договора
    }

    if (data.userType === 'author') {
      return [...baseSteps, authorStep, contractStep];
    }

    if (data.userType === 'organization') {
      return [...baseSteps, organizationStep, contractStep];
    }

    return [...baseSteps, readerStep];
  }, [data.userType]);

  // ✅ ВАЛИДАЦИЯ
  const validateStep = () => {
    const nextErrors: Partial<Record<keyof UserRegistrationData | 'confirmPassword', string>> = {};

    // 🔹 ШАГ 1
    if (currentStep === 0) {
      if (!data.username.trim()) nextErrors.username = 'Введите логин';
      if (!data.password.trim()) nextErrors.password = 'Введите пароль';
      if (data.password.length < 4) nextErrors.password = 'Пароль должен быть не менее 4 символов';
      if (data.password !== confirmPassword)
        nextErrors.confirmPassword = 'Пароли не совпадают';
    }

    // 🔹 ШАГ 2
    if (currentStep === 1) {
      if (!data.email.trim()) nextErrors.email = 'Введите email';
    }

    // 🔹 ШАГ 3
    if (currentStep === 2) {
      if (!data.verificationCode.trim())
        nextErrors.verificationCode = 'Введите код подтверждения';
    }

    // 🔹 ШАГ 4
    if (currentStep === 3) {
      if (!data.userType) nextErrors.userType = 'Выберите тип профиля';
    }

    // 🔹 ШАГ 5
    if (currentStep === 4 && data.userType === 'reader') {
      if (!data.lastName.trim()) nextErrors.lastName = 'Введите фамилию';
      if (!data.firstName.trim()) nextErrors.firstName = 'Введите имя';
      if (!data.phone_number.trim())
        nextErrors.phone_number = 'Введите номер телефона';
    }

    if (currentStep === 4 && data.userType === 'author') {
      if (!data.lastName.trim()) nextErrors.lastName = 'Введите фамилию';
      if (!data.firstName.trim()) nextErrors.firstName = 'Введите имя';
      if (!data.phone_number.trim())
        nextErrors.phone_number = 'Введите номер телефона';
      if (!data.specialization?.trim())
        nextErrors.specialization = 'Введите специализацию';
      if (!data.bio?.trim()) nextErrors.bio = 'Введите краткую биографию';
    }

    if (currentStep === 4 && data.userType === 'organization') {
      if (!data.organization_name?.trim())
        nextErrors.organization_name = 'Введите короткое название';
      if (!data.legal_name?.trim())
        nextErrors.legal_name = 'Введите полное название';
      if (!data.bio?.trim())
        nextErrors.bio = 'Введите краткое описание';
      if (!data.address?.trim())
        nextErrors.address = 'Введите адрес';
    }

    // 🔥 ШАГ 6 — ДОГОВОР (ТОЛЬКО author / organization)
    const isContractStep = steps[currentStep]?.number === 6;

    if (isContractStep && (data.userType === 'author' || data.userType === 'organization')) {
      if (!data.contractAccepted) {
        nextErrors.contractAccepted = 'Необходимо принять условия договора';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // 🚀 переход
  const handleStepCompletion = async () => {
    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    await completeRegistration(data);
  };

  // 🔥 КОМПОНЕНТЫ
  const stepComponents = useMemo(() => {
    const base = [
      <Step1Credentials
        key="step1"
        data={data}
        errors={errors}
        updateField={updateField}
        confirmPassword_val={confirmPassword}
        setConfirmPassword_val={setConfirmPassword}
      />,
      <Step2PersonalInfo
        key="step2"
        data={data}
        errors={errors}
        updateField={updateField}
      />,
      <Step3Verification
        key="step3"
        data={data}
        errors={errors}
        updateField={updateField}
      />,
      <Step5UserType
        key="step4"
        data={data}
        errors={errors}
        updateField={updateField}
      />,
      <Step6Details
        key="step5"
        data={data}
        errors={errors}
        updateField={updateField}
        handleFileChange={handleFileChange}
      />,
    ];

    // ❗ договор только для author и organization
    if (data.userType === 'author' || data.userType === 'organization') {
      return [
        ...base,
        <Step7Contract
          key="step6"
          data={data}
          errors={errors}
          updateField={updateField}
        />,
      ];
    }

    return base;
  }, [data, errors, confirmPassword, updateField]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-5xl">
        <RegisterForm
          steps={steps}
          currentStep={currentStep}
          stepComponent={stepComponents[currentStep]}
          isRegistered={isAuthenticated}
          isLoading={isLoading}
          onPrev={handlePrev}
          onNext={handleStepCompletion}
          submitButtonText={
            currentStep === steps.length - 1 ? 'Завершить' : 'Далее'
          }
        />
      </div>
    </div>
  );
};