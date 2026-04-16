export const CATEGORIES = [
  {
    value: "school",
    label: {
      ru: "Школьные",
      kg: "Мектептик",
    },
    subjects: [
      "Математика",
      "Физика",
      "История",
      "Русский язык",
      "Английский язык",
    ],
    grades: Array.from({ length: 11 }, (_, i) => i + 1),
  },
  {
    value: "university",
    label: {
      ru: "ВУЗ",
      kg: "ЖОЖ",
    },
    types: [
      { value: "course", label: { ru: "Курсовая", kg: "Курстук иш" } },
      { value: "diploma", label: { ru: "Дипломная", kg: "Дипломдук иш" } },
      { value: "article", label: { ru: "Статья", kg: "Макала" } },
      { value: "other", label: { ru: "Другое", kg: "Башка" } },
    ],
  },
];