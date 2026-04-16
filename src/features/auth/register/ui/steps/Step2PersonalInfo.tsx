import { memo } from 'react';
import { FormInput } from '@/shared/ui/FormInput';
import { StepWrapper } from '@/shared/ui/StepWrapper';
import type { StepProps } from '../types';

export const Step2PersonalInfo = memo(({ data, errors, updateField }: StepProps) => (
  <StepWrapper title="Email" description="Введите электронную почту">
    <FormInput
      label="Электронная почта"
      name="email"
      type="email"
      value={data.email}
      onChange={(e) => updateField('email', e.target.value)}
      error={errors.email}
    />
  </StepWrapper>
));