import { useState } from 'react';
import { useUserStore } from '@/entities/user/model/user-store';
import type { UserRegistrationData, User, SystemRole } from '@/entities/user/model/types';
import { useAuth } from '@/entities/user/model/useAuth';

const mapRoleToSystemRole = (role: UserRegistrationData['userType']): SystemRole => {
  switch (role) {
    case 'author':
      return 2;
    case 'organization':
      return 3;
    case 'reader':
    default:
      return 1;
  }
};

export const useRegister = () => {
  const { setUser, setLoading, isLoading } = useUserStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();

  const completeRegistration = async (data: UserRegistrationData): Promise<User> => {
    setLoading(true);
    setServerError(null);

    try {
      const createdUser: User = {
        id: Date.now(),
        profile_id: Date.now(),
        email: data.email,
        username: data.username,
        role: mapRoleToSystemRole(data.userType),
        first_name: data.firstName,
        last_name: data.lastName,
        third_name: data.middleName,
        phone: data.phone_number,
        address: data.address,
        website: data.website,
        description: data.bio,
        name_of_organization: data.organization_name,
      };

      setUser(createdUser);
      login(createdUser, 'mock-token');

      return createdUser;
    } catch (error) {
      setServerError('Ошибка регистрации');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    completeRegistration,
    isLoading,
    serverError,
    setServerError,
  };
};