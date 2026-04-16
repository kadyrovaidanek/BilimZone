export type UserRole = 'reader' | 'author' | 'organization';
export type SystemRole = 1 | 2 | 3 | 4;

export type UserRegistrationData = {
  username: string;
  email: string;
  password: string;
  verificationCode: string;

  userType: UserRole | '';

  lastName: string;
  firstName: string;
  middleName: string;
  phone_number: string;
  photo: File | null;

  specialization?: string;
  bio?: string;

  organization_name?: string;
  legal_name?: string;
  address?: string;
  website?: string;

  contractAccepted: boolean;
};

export interface User {
  id: number;
  profile_id: number;
  email: string;
  role: SystemRole;

  username?: string;
  first_name?: string;
  last_name?: string;
  third_name?: string;
  phone?: string;
  address?: string;
  logo?: string;
  website?: string;
  description?: string;
  name_of_organization?: string;
}