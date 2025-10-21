/**
 * 校验密码是否一致
 * @param password 密码
 * @param value 确认密码
 * @returns 是否一致
 */
export const validatorPasswordSame = (password: string, value: string) => {
  return password === value;
};

/**
 *
 * @param username 用户名
 * @returns 是否符合长度要求
 */
export const validatorUsernameLength = (username: string) => {
  return username.length >= 4 && username.length <= 20;
};

/**
 *
 * @param password 密码
 * @returns 是否符合长度要求
 */
export const validatorPasswordLength = (password: string) => {
  return password.length >= 6 && password.length <= 30;
};
