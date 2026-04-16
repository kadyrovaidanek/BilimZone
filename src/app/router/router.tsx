import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/app/layouts/AppLayout';

import { RootPage } from '@/pages/public/root/RootPage'; 
import { AboutPage } from '@/pages/public/about/AboutPage'; 
import { SupportPage } from '@/pages/public/support/SupportPage';

import { LoginPage } from '@/pages/public/auth/login/ui/LoginPage';
import { RegisterPage } from '@/pages/public/auth/register/ui/RegisterPage';
import { ForgotPasswordPage } from '@/pages/public/auth/forgot-password/ui/ForgotPasswordPage';

import { NotFoundPage } from '@/pages/note-found/ui/NotFoundPage';


import { CatalogPage } from "@/pages/public/catalog/CatalogPage";
import { CollectionPage } from '@/pages/library/ui/CollectionPage';
import { FavoritesPage } from '@/pages/public/favorites/ui/FavoritesPage';
import { ProfilePage } from '@/pages/profile/ui/ProfilePage';
import { PublicationsPage } from '@/pages/publications/ui/PublicationsPage';
import { AddPublicationPage } from "@/pages/publications/add/AddPublicationPage";
import { EditPublicationPage } from "@/pages/publications/edit/EditPublicationPage";
import { ReportsPage } from "@/pages/reports/ui/ReportsPage";
import { NotificationsPage } from "@/pages/notifications/ui/NotificationsPage";
import { CartPage } from "@/pages/cart/ui/CartPage";
import { AdminRoute } from "@/shared/lib/AdminRoute";
import { AdminMaterialsPage } from "@/pages/admin/AdminMaterialsPage";
import { AdminAgreementsPage } from "@/pages/admin/AdminAgreementsPage";
import { AdminNotificationsPage } from "@/pages/admin/AdminNotificationsPage";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { WalletPage } from "@/pages/wallet/ui/WalletPage";
import { MaterialPage } from '@/pages/material/MaterialPage';

export const Router = () => {
  return (
      <Routes>

        {/* 🔐 публичные */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 🔥 ВСЁ ВНУТРИ AppLayout */}
<Route element={<AppLayout />}>
  <Route path="/" element={<RootPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/support" element={<SupportPage />} />
  <Route path="/catalog" element={<CatalogPage />} />
  <Route path="/collection" element={<CollectionPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/favorites" element={<FavoritesPage />} />
  <Route path="/publications" element={<PublicationsPage />} />
  <Route path="/material/:id" element={<MaterialPage />} />

  
   <Route path="/publications/add" element={<AddPublicationPage />} />
  <Route path="/publications/edit/:id" element={<EditPublicationPage />} />

  <Route path="/reports" element={<ReportsPage />} />
<Route path="/notifications" element={<NotificationsPage />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/wallet" element={<WalletPage />} />
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/materials"
  element={
    <AdminRoute>
      <AdminMaterialsPage />
    </AdminRoute>
  }
/>

<Route
  path="/admin/agreements"
  element={
    <AdminRoute>
      <AdminAgreementsPage />
    </AdminRoute>
  }
/>

<Route
  path="/admin/notifications"
  element={
    <AdminRoute>
      <AdminNotificationsPage />
    </AdminRoute>
  }
/>

</Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};