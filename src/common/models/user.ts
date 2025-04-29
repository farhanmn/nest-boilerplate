interface UserData {
  id: number;
  sub?: number;
  name: string;
  email: string;
}

interface User extends UserData {
  password: string | null;
  salt: string | null;
}

interface UserToken {
  userid: number;
  username: string;
  token: string;
}

interface RegisterRequest extends Omit<UserData, 'id'> {
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse extends UserData {
  token: string;
}

export {
  User,
  UserData,
  UserToken,
  RegisterRequest,
  LoginRequest,
  LoginResponse
};
