import { useMemo, useState } from "react";

export type PublicationFormData = {
  id: number;
  title: string;
  description: string;
  category: string;
  subject: string;
  grade: string;
  type: string;
  priceType: "free" | "paid";
  price: number;
  file: File | null;
  contractAccepted: boolean;
  createdAt: string;
};

type AddPublicationFormProps = {
  initialData?: Partial<PublicationFormData>;
  onSubmit: (data: PublicationFormData) => void;
  onCancel: () => void;
};

export const AddPublicationForm = ({
  initialData,
  onSubmit,
  onCancel,
}: AddPublicationFormProps) => {
  const [form, setForm] = useState<PublicationFormData>({
    id: initialData?.id ?? Date.now(),
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    category: initialData?.category ?? "",
    subject: initialData?.subject ?? "",
    grade: initialData?.grade ?? "",
    type: initialData?.type ?? "",
    priceType: initialData?.priceType ?? "free",
    price: initialData?.price ?? 0,
    file: initialData?.file ?? null,
    contractAccepted: initialData?.contractAccepted ?? false,
    createdAt: initialData?.createdAt ?? new Date().toISOString(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isContractOpen, setIsContractOpen] = useState(false);

  const isPaid = useMemo(() => form.priceType === "paid", [form.priceType]);

  const updateField = <K extends keyof PublicationFormData>(
    field: K,
    value: PublicationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.title.trim()) nextErrors.title = "Введите название";
    if (!form.description.trim()) nextErrors.description = "Введите описание";
    if (!form.category.trim()) nextErrors.category = "Введите категорию";
    if (!form.subject.trim()) nextErrors.subject = "Введите предмет";
    if (!form.type.trim()) nextErrors.type = "Введите тип работы";

    if (isPaid) {
      if (!form.price || form.price <= 0) {
        nextErrors.price = "Введите цену больше 0";
      }

      if (!form.contractAccepted) {
        nextErrors.contractAccepted = "Нужно согласиться с договором";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-2 font-medium">Название</label>
        <input
          className="w-full border rounded-xl px-4 py-3"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block mb-2 font-medium">Описание</label>
        <textarea
          className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Категория</label>
          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Предмет</label>
          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Класс / уровень</label>
          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.grade}
            onChange={(e) => updateField("grade", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Тип работы</label>
          <input
            className="w-full border rounded-xl px-4 py-3"
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
          />
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Файл материала</label>
        <input
          type="file"
          onChange={(e) => updateField("file", e.target.files?.[0] ?? null)}
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Тип публикации</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              updateField("priceType", "free");
              updateField("price", 0);
              updateField("contractAccepted", false);
            }}
            className={`px-4 py-2 rounded-xl border ${
              form.priceType === "free"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300"
            }`}
          >
            Бесплатно
          </button>

          <button
            type="button"
            onClick={() => updateField("priceType", "paid")}
            className={`px-4 py-2 rounded-xl border ${
              form.priceType === "paid"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300"
            }`}
          >
            Платно
          </button>
        </div>
      </div>

      {isPaid && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 space-y-4">
          <div>
            <label className="block mb-2 font-medium">Цена</label>
            <input
              type="number"
              min="1"
              className="w-full border rounded-xl px-4 py-3 bg-white"
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div className="rounded-xl border bg-white p-4">
            <p className="text-sm text-gray-600 mb-3">
              Для публикации платного материала необходимо ознакомиться с договором.
            </p>

            <button
              type="button"
              onClick={() => setIsContractOpen((prev) => !prev)}
              className="border-2 border-orange-500 text-orange-600 px-4 py-2 rounded-xl font-medium hover:bg-orange-50 transition"
            >
              {isContractOpen ? "Скрыть договор" : "Открыть договор"}
            </button>

            {isContractOpen && (
              <div className="mt-4 rounded-xl border bg-slate-50 p-4 text-sm text-gray-700">
                <p className="font-semibold mb-2">Договор на платный материал</p>
                <p>
                  Размещая платный материал, вы подтверждаете, что являетесь его
                  автором или законным правообладателем, и соглашаетесь с условиями
                  публикации, распределения дохода и правилами платформы.
                </p>
              </div>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.contractAccepted}
              onChange={(e) => updateField("contractAccepted", e.target.checked)}
              className="mt-1"
            />
            <span>Я согласен(на) с условиями договора</span>
          </label>

          {errors.contractAccepted && (
            <p className="text-red-500 text-sm">{errors.contractAccepted}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-xl border border-gray-300"
        >
          Отмена
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-blue-600 text-white"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};