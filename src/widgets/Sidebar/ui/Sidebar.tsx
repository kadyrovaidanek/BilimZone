import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/entities/user/model/useAuth';
import { useSidebarContext } from '../model/SidebarContext';
import {
  getOwnerNavConfig,
  getProfessionalNavConfig,
  getPartnerNavConfig,
  getAdminNavConfig,
  NavSection,
} from '../config/links';
import { Button } from '@/shared/ui/Button';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// 🔥 ИМПОРТ SVG
import walletIcon from '@/assets/images/wallet.svg';

const SidebarContent = ({
  isCollapsed,
  onCollapseToggle,
  navConfig,
  onCloseMobile,
  onLogout,
}: {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  navConfig: NavSection[];
  onCloseMobile: () => void;
  onLogout: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">

      {/* 🔹 ЛОГО + WALLET */}
      <div className="p-4 border-b border-slate-200">

        {/* 🔹 ЛОГО */}
        <div className="flex justify-center mb-3">
          {!isCollapsed && (
            <span className="font-bold text-lg">
              <span className="text-blue-900">BILIM</span>
              <span className="text-orange-500">ZONE</span>
            </span>
          )}
        </div>

        {/* 🔹 WALLET */}
        {!isCollapsed && (
          <div className="flex items-center justify-center gap-2 bg-slate-50 rounded-lg py-2 px-3">
            <img
              src={walletIcon}
              alt="wallet"
              className="w-5 h-5 opacity-80"
            />

            <span className="text-sm font-medium text-slate-700">
              0 сом
            </span>
          </div>
        )}

        {/* ❌ MOBILE CLOSE */}
        <button
          onClick={onCloseMobile}
          className="p-2 lg:hidden text-slate-500 absolute right-2 top-2"
        >
          <FaTimes />
        </button>

      </div>

      {/* 🔹 НАВИГАЦИЯ */}
      <nav className="flex-grow p-3 space-y-4 overflow-y-auto">
        {navConfig.map((section) => (
          <div key={section.title}>
            {section.title && !isCollapsed && (
              <h3 className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">
                {section.title}
              </h3>
            )}

            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2.5 text-sm transition ${isActive
                        ? 'bg-orange-50 text-orange-600 font-semibold'
                        : 'text-slate-800 hover:bg-slate-100'
                      }`
                    }
                  >
                    {!isCollapsed && (
                      <span className="pl-2">{link.text}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* 🔻 LOGOUT (МОБИЛКА) */}
      <div className="p-3 lg:hidden">
        <Link to="/">
          <Button onClick={onLogout} variant="outline">
            {t('auth.logout')}
          </Button>
        </Link>
      </div>

      {/* 🔻 COLLAPSE (ДЕСКТОП) */}
      <div className="p-3 hidden lg:block">
        <button
          onClick={onCollapseToggle}
          className={`w-full flex items-center px-3 py-2.5 ${isCollapsed ? 'justify-center' : 'justify-between'
            }`}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          {!isCollapsed && <span>{t('sidebar.collapse')}</span>}
        </button>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isOpen, close } = useSidebarContext();
  const [collapsed, setCollapsed] = useState(false);

  // 🔥 УБИРАЕМ SIDEBAR ПРИ LOGOUT
  useEffect(() => {
    if (!user || !isAuthenticated) {
      close();
      setCollapsed(false);
    }
  }, [user, isAuthenticated, close]);

  if (!user || !isAuthenticated) {
    return null;
  }

  // 🔥 РОЛИ
  const navConfig =
    user.role === 4
      ? getAdminNavConfig()
      : user.role === 2
        ? getProfessionalNavConfig()
        : user.role === 3
          ? getPartnerNavConfig()
          : getOwnerNavConfig();

  const handleLogout = () => {
    close();
    setCollapsed(false);
    logout();
  };

  return (
    <>
      {/* 💻 DESKTOP */}
      <motion.aside
        animate={{ width: collapsed ? '5.5rem' : '16rem' }}
        className="hidden lg:flex bg-white border-r sticky top-0 h-screen"
      >
        <SidebarContent
          isCollapsed={collapsed}
          onCollapseToggle={() => setCollapsed(!collapsed)}
          navConfig={navConfig}
          onCloseMobile={close}
          onLogout={handleLogout}
        />
      </motion.aside>

      {/* 📱 MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={close}
          >
            <div
              className="w-64 h-full bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent
                isCollapsed={false}
                onCollapseToggle={close}
                navConfig={navConfig}
                onCloseMobile={close}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};