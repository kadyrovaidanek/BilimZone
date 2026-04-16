import { memo } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import { StepWrapper } from '@/shared/ui/StepWrapper';
import type { StepProps } from '../types';

type Step1CredentialsProps = StepProps & {
  confirmPassword_val: string;
  setConfirmPassword_val: (val: string) => void;
};

export const Step1Credentials = memo(
  ({ data, errors, updateField, confirmPassword_val, setConfirmPassword_val }: Step1CredentialsProps) => {
    return (
      <StepWrapper title="Логин и пароль" description="Введите логин и пароль для аккаунта">
        <FormInput
          label="Логин"
          name="username"
          value={data.username}
          onChange={(e) => updateField('username', e.target.value)}
          error={errors.username}
        />

        <FormInput
          label="Пароль"
          name="password"
          type="password"
          value={data.password}
          onChange={(e) => updateField('password', e.target.value)}
          error={errors.password}
        />

        <FormInput
          label="Повторите пароль"
          name="confirmPassword"
          type="password"
          value={confirmPassword_val}
          onChange={(e) => setConfirmPassword_val(e.target.value)}
          error={errors.confirmPassword}
        />
      </StepWrapper>
    );
  }
);