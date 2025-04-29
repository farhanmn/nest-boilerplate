import { Algorithm, sign, verify } from 'jsonwebtoken';
import { match } from './crypto.js';
import { config } from 'dotenv';
import { LoginRequest, User, UserData, UserToken } from '../common/models/user';
config();

const jwtConf = {
  secret: process.env.JWT_SECRET || 'secret',
  refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
  signOptions: {
    algorithm: 'HS256' as Algorithm,
    expiresIn: 60 * 60 * 24 * 10
  },
  verifyOptions: {
    algorithms: ['HS256' as Algorithm]
  }
};

const create_token = (userdata: UserData, expires?: string): UserToken => {
  const data = {
    userid: userdata.id,
    username: userdata.name,
    token: ''
  };
  const tokenOptions = jwtConf.signOptions;

  if (expires) {
    Object.assign({}, tokenOptions, {
      expiresIn: expires
    });
  }

  data.token = sign(data, jwtConf.secret, tokenOptions);

  return data;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, jwtConf.secret, jwtConf.verifyOptions);

  return decoded || false;
};

const verifyPassword = (
  userdata: User,
  logindata: LoginRequest
): UserData | null => {
  if (!userdata) {
    return null;
  }

  if (match(logindata.password, userdata.password, userdata.salt)) {
    return {
      id: userdata.id,
      sub: userdata.id,
      name: userdata.name,
      email: userdata.email
    };
  }
  return null;
};

export { create_token, verifyPassword, verifyToken };
