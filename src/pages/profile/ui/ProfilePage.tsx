import { useAuth } from "@/entities/user/model/useAuth";
import { ReaderPage } from "./ReaderPage";
import { AuthorPage } from "./AuthorPage";
import { OrganizationPage } from "./OrganizationPage";

export const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 1) return <ReaderPage />;
  if (user.role === 2) return <AuthorPage />;
  if (user.role === 3) return <OrganizationPage />;

  return <div>Неизвестная роль</div>;
};