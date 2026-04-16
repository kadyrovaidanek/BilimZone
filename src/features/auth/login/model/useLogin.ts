import { useState } from "react";
import { useAuth } from "@/entities/user/model/useAuth";
import type { SystemRole } from "@/entities/user/model/types";

type MockUser = {
  id: number;
  profile_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: SystemRole;
};

const MOCK_USERS: Array<MockUser & { password: string }> = [
  {
    id: 1,
    profile_id: 1,
    username: "reader",
    password: "1234",
    first_name: "Reader",
    last_name: "User",
    email: "reader@example.com",
    role: 1,
  },
  {
    id: 2,
    profile_id: 2,
    username: "author",
    password: "1234",
    first_name: "Author",
    last_name: "User",
    email: "author@example.com",
    role: 2,
  },
  {
    id: 3,
    profile_id: 3,
    username: "partner",
    password: "1234",
    first_name: "Partner",
    last_name: "User",
    email: "partner@example.com",
    role: 3,
  },
  {
    id: 4,
    profile_id: 4,
    username: "admin",
    password: "1234",
    first_name: "Admin",
    last_name: "Manager",
    email: "admin@example.com",
    role: 4, // 🔥
  },
];

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login: authLogin } = useAuth();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const foundUser = MOCK_USERS.find(
        (user) => user.username === username && user.password === password
      );

      if (!foundUser) {
        throw new Error("INVALID_CREDENTIALS");
      }

      const userProfile: MockUser = {
        id: foundUser.id,
        profile_id: foundUser.profile_id,
        username: foundUser.username,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        email: foundUser.email,
        role: foundUser.role,
      };

      const fakeToken = "local-mock-token";

      authLogin(userProfile, fakeToken); // 🔥 ВСЁ
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}