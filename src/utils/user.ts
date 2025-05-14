import { match } from './crypto';
import { config } from 'dotenv';
import { LoginRequest, User, UserData } from '../common/types/user.interface';
config();

const verifyPassword = (
  userData: User,
  loginData: LoginRequest
): UserData | null => {
  if (!userData) {
    return null;
  }

  if (match(loginData.password, userData.password, userData.salt)) {
    return {
      id: userData.id,
      sub: userData.id,
      name: userData.name,
      email: userData.email
    };
  }
  return null;
};

export { verifyPassword };
