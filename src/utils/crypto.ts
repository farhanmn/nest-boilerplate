import { randomBytes, createHmac } from 'crypto';

const SALTSIZE = 16;

const generateRandomSalt = (saltSize: number): string => {
  return randomBytes(saltSize).toString('base64').slice(0, saltSize);
};

const hashPassword = (pwd: string, salt: string) => {
  return createHmac('sha512', salt).update(pwd).digest('base64');
};

const match = (
  currPwd: string,
  hashedPwd: string | null,
  salt: string | null
) => {
  const currPwdHash = createHmac('sha512', salt ?? '')
    .update(currPwd)
    .digest('base64');

  return currPwdHash === hashedPwd;
};

const hash = (currPwd: string) => {
  const salt = generateRandomSalt(SALTSIZE);
  const pwd = hashPassword(currPwd, salt);

  return {
    pwd,
    salt
  };
};

export { match, hash };
