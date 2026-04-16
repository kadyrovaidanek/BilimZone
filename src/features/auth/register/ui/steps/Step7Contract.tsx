import { StepWrapper } from '@/shared/ui/StepWrapper';
import type { StepProps } from '../types';

export const Step7Contract = ({ data, updateField, errors }: StepProps) => {
  const contractTitle =
    data.userType === 'author'
      ? 'Договор для автора'
      : data.userType === 'organization'
      ? 'Договор для организации'
      : 'Пользовательское соглашение';

  return (
    <StepWrapper
      title={contractTitle}
      description="Ознакомьтесь с условиями и подтвердите согласие"
    >
      <div className="space-y-5">

        {/* 📄 Блок договора */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-600 mb-3">
            Здесь будет отображаться текст или PDF договора.
          </p>

          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Открыть договор
          </button>
        </div>

        {/* ✅ Чекбокс */}
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={!!data.contractAccepted}
            onChange={(e) =>
              updateField('contractAccepted', e.target.checked)
            }
            className="mt-1"
          />
          <span>Я согласен(на) с условиями договора</span>
        </label>

        {/* ❗ Ошибка */}
        {errors.contractAccepted && (
          <p className="text-red-500 text-sm">
            {errors.contractAccepted}
          </p>
        )}

      </div>
    </StepWrapper>
  );
};