export interface NavLinkItem {
  to: string;
  text: string;
}

export interface NavSection {
  title: string;
  links: NavLinkItem[];
}

// 👤 ЧИТАТЕЛЬ
export const getOwnerNavConfig = (): NavSection[] => {
  return [
    {
      title: "",
      links: [
        { to: "/", text: "Главное" },
        { to: "/library", text: "Моя коллекция" }, // ✅ изменили
        { to: "/favorites", text: "Избранное" },
        { to: "/cart", text: "Корзина" },
        { to: "/wallet", text: "Кошелек" },
        { to: "/notifications", text: "Уведомления" },
        { to: "/profile", text: "Мой кабинет" },
      ],
    },
  ];
};

// 👔 АДМИН
export const getAdminNavConfig = (): NavSection[] => {
  return [
    {
      title: "",
      links: [
        { to: "/admin", text: "Главная" },
        { to: "/admin/materials", text: "Материалы" },
        { to: "/admin/agreements", text: "Соглашения" },
        { to: "/admin/notifications", text: "Уведомления" },
      ],
    },
  ];
};

// ✍️ АВТОР / 🏢 ОРГАНИЗАЦИЯ
export const getProfessionalNavConfig = (): NavSection[] => {
  return [
    {
      title: "",
      links: [
        { to: "/", text: "Главное" },
        { to: "/library", text: "Моя коллекция" }, // ✅ изменили
        { to: "/publications", text: "Мои публикации" },
        { to: "/favorites", text: "Избранное" },
        { to: "/cart", text: "Корзина" },
        { to: "/wallet", text: "Кошелек" },
        { to: "/reports", text: "Отчеты" },
        { to: "/notifications", text: "Уведомления" },
        { to: "/profile", text: "Мой кабинет" },
      ],
    },
  ];
};

export const getPartnerNavConfig = (): NavSection[] => {
  return getProfessionalNavConfig();
};