import React, { memo } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import { StepWrapper } from '@/shared/ui/StepWrapper';
import type { StepProps } from '../types';

type Step6Props = StepProps & {
  handleFileChange: (field: 'photo') => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Step6Details = memo(({ data, updateField, handleFileChange, errors }: Step6Props) => {
  if (data.userType === 'reader') {
    return (
      <StepWrapper title="Персональные данные" description="Введите ваши данные">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Фамилия"
            name="lastName"
            value={data.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            error={errors.lastName}
          />

          <FormInput
            label="Имя"
            name="firstName"
            value={data.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            error={errors.firstName}
          />

          <FormInput
            label="Отчество"
            name="middleName"
            value={data.middleName}
            onChange={(e) => updateField('middleName', e.target.value)}
            error={errors.middleName}
          />

          <FormInput
            label="Номер телефона"
            name="phone_number"
            value={data.phone_number}
            onChange={(e) => updateField('phone_number', e.target.value)}
            error={errors.phone_number}
          />

          <div className="md:col-span-2">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              Фото
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileChange('photo')}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </StepWrapper>
    );
  }

  if (data.userType === 'author') {
    return (
      <StepWrapper title="Данные автора" description="Заполните информацию об авторе">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Фамилия"
            name="lastName"
            value={data.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            error={errors.lastName}
          />

          <FormInput
            label="Имя"
            name="firstName"
            value={data.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            error={errors.firstName}
          />

          <FormInput
            label="Отчество"
            name="middleName"
            value={data.middleName}
            onChange={(e) => updateField('middleName', e.target.value)}
            error={errors.middleName}
          />

          <FormInput
            label="Номер телефона"
            name="phone_number"
            value={data.phone_number}
            onChange={(e) => updateField('phone_number', e.target.value)}
            error={errors.phone_number}
          />

          <FormInput
            label="Специализация"
            name="specialization"
            value={data.specialization || ''}
            onChange={(e) => updateField('specialization', e.target.value)}
            error={errors.specialization}
          />

          <FormInput
            label="Краткая биография"
            name="bio"
            value={data.bio || ''}
            onChange={(e) => updateField('bio', e.target.value)}
            isTextArea
            className="md:col-span-2"
            error={errors.bio}
          />

          <div className="md:col-span-2">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              Фото
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileChange('photo')}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </StepWrapper>
    );
  }

  if (data.userType === 'organization') {
    return (
      <StepWrapper title="Данные организации" description="Заполните информацию об организации">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Название организации"
            name="organization_name"
            value={data.organization_name || ''}
            onChange={(e) => updateField('organization_name', e.target.value)}
            error={errors.organization_name}
          />

          <FormInput
            label="Полное название"
            name="legal_name"
            value={data.legal_name || ''}
            onChange={(e) => updateField('legal_name', e.target.value)}
            error={errors.legal_name}
          />

          <FormInput
            label="Краткое описание"
            name="bio"
            value={data.bio || ''}
            onChange={(e) => updateField('bio', e.target.value)}
            isTextArea
            error={errors.bio}
          />

          <FormInput
            label="Адрес"
            name="address"
            value={data.address || ''}
            onChange={(e) => updateField('address', e.target.value)}
            error={errors.address}
          />

          <FormInput
            label="Сайт"
            name="website"
            value={data.website || ''}
            onChange={(e) => updateField('website', e.target.value)}
            error={errors.website}
          />

          <div className="md:col-span-2">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              Фото
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileChange('photo')}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </StepWrapper>
    );
  }

  return null;
});